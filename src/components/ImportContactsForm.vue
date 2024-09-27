<script setup>
import { db } from '@/assets/firebase';
import FullCheckmark from '@/assets/full-checkmark.svg';
import Upload from '@/assets/upload.svg';
import { user } from '@/composables/getUser';
import { addDoc, collection, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { isValidNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import Papa from 'papaparse';
import validator from 'validator';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({ 
    contacts: Array,
 });


const tagToContactsMap = new Map(); 

const dummyLists = [
    { id: 'list1', name: 'List 1' },
    { id: 'list2', name: 'List 2' },
    { id: 'list3', name: 'List 3' },
    { id: 'list4', name: 'List 4' },
    { id: 'list5', name: 'List 5' },
];


const dummyDataCSV = 'https://drive.usercontent.google.com/download?id=1M3dbgvoswoscYwuk92i2iMyt_SXUz6OQ&export=download&authuser=0'
const shortDummyDataCSV = 'https://drive.usercontent.google.com/download?id=1yuQHUlnp7bttHy1ivAIVROA-cf8Zg146&export=download&authuser=0'


const updateDuplicatesFromCSV = ref(null);
const showAlert = ref(false);

function checkImportRule() {
    if (updateDuplicatesFromCSV.value === null) {
        showAlert.value = true;
    } else {
        showAlert.value = false;
    }
}
/* ------------------------------------------------------
     Logic for contact list import
-------------------------------------------------------- */
const newListName = ref('');
const selectedList = ref('Select a list...')

watch(newListName, () => {
    if (newListName.value) {
        selectedList.value = 'Select a list...'; // Reset selectedList when newListName changes
    }
});
watch(selectedList, () => {
    if (selectedList.value) {
        newListName.value = ''; // Reset newListName when selectedList changes
    }
});

async function getOrCreateTag(tagName, userId){
    const tagsCollectionRef = collection(db, "tags");

    const q = query(tagsCollectionRef, where("userId", "==", userId), where("tagName", "==", tagName));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        // Return the first matching document snapshot
        return querySnapshot.docs[0]; // Return the entire document snapshot, not just the ID
    }

    // If tag doesn't exist, create a new one
    const newTagRef = await addDoc(tagsCollectionRef, {
        userId: userId,
        tagName: tagName,
        userEmail: user.value.email,
        contacts: [],
        dateAdded: serverTimestamp(),
        lastUpdated: serverTimestamp(),
    });

    // Return the newly created document reference
    return await getDoc(newTagRef); // Get the full document snapshot
}



const processData = async (csvData, headers) => {

    const errors = {
        missingNames: [],
        missingEmails: [],
        missingPhones: [],
    }
    /* --------------------------------------------------------------
    *  Processing the headers text to structure correct columns
    --------------------------------------------------------------- */
    // Email    
    const emailRegex = /email|e[-\s]?mail/i;
    const emailIndex = headers.findIndex(header => emailRegex.test(header));
    // Phone
    const phoneRegex = /phone|tel|telephone|cell\s*phone|mobile\s*phone|contact\s*number|#/i;
    const phoneIndex = headers.findIndex(header => phoneRegex.test(header));
    // Name
    const nameColumnIndex = headers.findIndex(header => /name/i.test(header));
    let firstNameIndex, lastNameIndex;
    if (nameColumnIndex !== -1) { // Name column found
        const fullNameHeader = headers[nameColumnIndex];

        // Is the name column split into first and last name columns?
        if (nameColumnIndex !== headers.lastIndexOf(header => /name/i.test(header))) {
            // Treat as separate first and last name columns
            firstNameIndex = headers.findIndex(header => /first\s*name/i.test(header));
            lastNameIndex = headers.findIndex(header => /last\s*name/i.test(header));
        } else {
            // Treat as a single full name column, assuming the full name is in the format "First Last"
            const fullName = row[fullNameHeader];
            const nameParts = fullName ? fullName.split(/\s+/) : [];
            let firstName = nameParts[0] || '';
            let lastName = nameParts.slice(1).join(' ') || '';

            // Check if the last part is a known suffix like "Jr."
            const suffixes = ["Junior", "Senior", "Jr.", "Jr", "Sr", "Sr.", "Snr.", "II", "III", "IV", "V", "VI", "VII"];
            const additionalNamePart = nameParts[nameParts.length - 1];
            if (suffixes.includes(additionalNamePart)) {
                firstName += ' ' + additionalNamePart; // Append the suffix to the first name
                lastName = nameParts.slice(1, -1).join(' ');
            }

            if (firstName && lastName) {
                firstNameIndex = nameColumnIndex;
                lastNameIndex = -1; // Not needed if it's a full name
            }
        }
    } else {
        errors.missingNames.push(row);
    }
    // Note and Tags
    const noteRegex = /note|remarks|comment/i;
    const noteIndex = headers.findIndex(header => noteRegex.test(header));
    const tagsRegex = /tags|labels|categories/i;
    const tagsIndex = headers.findIndex(header => tagsRegex.test(header));


    /* -----------------------------------------------------------
    *  Validate and structure the data for each contact
    ----------------------------------------------------------- */
    const phoneUtil = PhoneNumberUtil.getInstance();

    const processedValues = csvData.map(row => {
        //Gather the column index values for each header
        const emailHeader = headers[emailIndex];
        const phoneHeader = headers[phoneIndex];
        // const firstNameHeader = headers[firstNameIndex];
        // const lastNameHeader = headers[lastNameIndex];
        const noteHeader = headers[noteIndex];
        const tagsHeader = headers[tagsIndex]; 

        // Email
        const email = emailHeader ? row[emailHeader] : '';
        if (!email || !validator.isEmail(email)) {  // Add validation for empty and invalid email
            errors.missingEmails.push(row);
            return null;
        }

        // Phone
        let phone = phoneIndex !== -1 ? row[phoneHeader] : '';
        if (phone) {
            try {
            let parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(phone, 'US'); // Default to US
            
            if (phoneUtil.isValidNumber(parsedPhoneNumber)) {
                phone = phoneUtil.format(parsedPhoneNumber, PhoneNumberFormat.INTERNATIONAL);
            } else {
                parsedPhoneNumber = phoneUtil.parseAndKeepRawInput(phone, 'GB'); // Fallback to UK
                
                if (phoneUtil.isValidNumber(parsedPhoneNumber)) {
                phone = phoneUtil.format(parsedPhoneNumber, PhoneNumberFormat.INTERNATIONAL);
                } else {
                errors.missingPhones.push(row); // If still invalid, add to errors
                }
            }
            } catch (error) {
                console.warn(`Failed to parse phone number: ${phone}`, error);
                errors.missingPhones.push(row); // Handle parse errors
            }
        }

        
        // Names
        let firstName = '';
        let lastName = '';

        if (firstNameIndex !== -1 && lastNameIndex !== -1) {
            firstName = row[headers[firstNameIndex]] || '';
            lastName = row[headers[lastNameIndex]] || '';
        } else if (nameColumnIndex !== -1) {
            const fullName = row[headers[nameColumnIndex]] || '';
            const nameParts = fullName.split(/\s+/);
            firstName = nameParts[0] || '';
            lastName = nameParts.slice(1).join(' ') || '';
        }

        // Note & Tags
        const note = noteIndex !== -1 ? row[noteHeader] || '' : '';
        const tags = tagsIndex !== -1 ? (row[tagsHeader] || '').split(',').map(tag => tag.trim()) : [];

        return { email, phone, firstName, lastName, note, tags };
    });

    return processedValues;
}


function importCSV(event) {
// First Name, Last Name, Email, Note, Phone, Tags
const file = event.target.files[0];

Papa.parse(file, {
    header: true,      
    complete: async function(results) {
        const headers = results.meta.fields;
        const processedData = await processData(results.data, headers);

        const validContacts = processedData.filter(contact => {
            // Check if contact is not null and has at least one non-empty field
            return contact && (contact.email || contact.phone || contact.firstName || contact.lastName);
        });
        // Fetch existing contacts from the database
        const q = query(collection(db, 'contacts'), where('userId', '==', user.value.uid));
        const existingContactsSnapshot = await getDocs(q);
        const existingContacts = new Map();
        existingContactsSnapshot.forEach(doc => {
            const data = doc.data();
            existingContacts.set(data.email, doc.id);
        });



        const contactsToAddToList = [];
        
        let listRef;
        if (selectedList.value !== 'Select a list...' && selectedList.value) {
            listRef = doc(db, 'lists', selectedList.value);
            await updateDoc(listRef, {
                lastUpdated: serverTimestamp()
            });
        } else if (newListName.value !== '') {
            const newList = await addDoc(collection(db, "lists"), {
                userId: user.value.uid,
                listName: newListName.value,
                dateAdded: serverTimestamp(),
                lastUpdated: serverTimestamp(),
                contacts: []
            });
            listRef = doc(db, 'lists', newList.id);
        }

        
        if (validContacts && validContacts.length > 0) {
            for (const contact of validContacts) {
                let contactId;
                
                // Check if the contact already exists, if so, update it
                if (existingContacts.has(contact.email)) {
                    contactId = existingContacts.get(contact.email);


                    if (updateDuplicatesFromCSV.value === true){
                            const contactRef = doc(db, 'contacts', contactId);
                            await updateDoc(contactRef, {
                                firstName: contact.firstName,
                                lastName: contact.lastName,
                                phone: contact.phone,
                                note: contact.note,
                                dateUpdated: serverTimestamp()
                            });
                            console.log('Contact updated:', contact.email);
                    } else {
                        //if updateDuplicatesFromCSV is false, keep the previous data
                        console.log('Duplicate contact found. Keeping previous data for:', contact.email);
                    }
                } else {
                    // If the contact doesn't exist, create it
                    const contactRef = await addDoc(collection(db, 'contacts'), {
                        email: contact.email,
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        phone: contact.phone,
                        note: contact.note,
                        userId: user.value.uid,
                        dateAdded: serverTimestamp(),
                        dateUpdated: serverTimestamp()
                    });
                    contactId = contactRef.id;
                    console.log('Contact added with ID:', contactId);
                }



                // Handle the tags for the contact
                if (contact.tags && contact.tags.length > 0) { 
                    for (const tagName of contact.tags) {
                        // Get or create the tag
                        const tagDoc = await getOrCreateTag(tagName, user.value.uid);

                        // Now tagDoc is a document snapshot, so we can access its data
                        const tagData = tagDoc.data();
                        if (!tagData.contacts.includes(contactId)) {
                            tagData.contacts.push(contactId);

                            // Update the tag with the new contacts array
                            await updateDoc(tagDoc.ref, {
                                contacts: tagData.contacts,
                                lastUpdated: serverTimestamp(),
                            });
                            console.log(`Tag "${tagName}" updated with contact: ${contact.email}`);
                        }
                    }
                }


            }
        }

        

        router.push('/');
    },
    error: function(error) {
        console.error('Error parsing CSV:', error);
    }
});
}


</script>



<template>
    <div class="max-w-2xl mx-auto p-6">
      <!-- Heading -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Import Contacts</h1>
        <p class="mt-2 text-gray-600">Upload your contacts in CSV format to get started.</p>
      </div>
  
      <!-- Import Instructions -->
      <div class="bg-white shadow-md rounded-lg p-6 space-y-6">
        <p class="text-gray-700">
          To import your contacts, press the button below to upload your CSV file.
        </p>
        <p class="text-gray-700">
          You can also
          <a :href="dummyDataCSV" class="text-blue-600 hover:underline">
            download our sample contacts
          </a>
          to test the app.
        </p>
  
        <!-- Question 1 -->
        <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div class="flex items-center mb-4">
            <div class="bg-blue-500 text-white rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
            <p class="text-lg font-semibold text-gray-800">
              How would you like to handle duplicate emails?
            </p>
          </div>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="radio"
                :value="true"
                v-model="updateDuplicatesFromCSV"
                class="form-radio text-blue-600"
              />
              <span class="ml-2 text-gray-700">Update existing contacts with import data.</span>
            </label>
            <label class="flex items-center">
              <input
                type="radio"
                :value="false"
                v-model="updateDuplicatesFromCSV"
                class="form-radio text-blue-600"
              />
              <span class="ml-2 text-gray-700">Keep existing contact data.</span>
            </label>
          </div>
        </div>
  
        <!-- Question 2 -->
        <div class="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div class="flex items-center mb-4">
            <div class="bg-blue-500 text-white rounded-full p-2 mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </div>
            <p class="text-lg font-semibold text-gray-800">
              Would you like to add your imports to a contact list?
            </p>
          </div>
          <div class="space-y-4">
            <!-- Add to New List -->
            <div>
              <label for="addList" class="block text-sm font-medium text-gray-700">
                Add to new list
              </label>
              <div class="mt-1 flex items-center">
                <input
                  type="text"
                  id="addList"
                  v-model="newListName"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter new list name"
                />
                <svg
                  v-if="newListName"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
  
            <!-- Add to Existing List -->
            <div>
              <label for="selectList" class="block text-sm font-medium text-gray-700">
                Add to existing list
              </label>
              <div class="mt-1 flex items-center">
                <select
                  id="selectList"
                  v-model="selectedList"
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option>Select a list...</option>
                  <option
                    v-for="list in dummyLists"
                    :key="list.id"
                    :value="list.id"
                  >
                    {{ list.name }}
                  </option>
                </select>
                <svg
                  v-if="selectedList !== 'Select a list...'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-green-500 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Upload Button -->
        <div class="text-center">
          <label
            for="file-upload"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            @click="checkImportRule"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M5 10l7-7m0 0l7 7M12 3v18" />
            </svg>
            Upload CSV File
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
              :disabled="showAlert"
              @change="importCSV"
            />
          </label>
        </div>
      </div>
  
      <!-- Alert -->
      <div
        v-if="showAlert"
        class="mt-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
        role="alert"
      >
        <p class="font-bold">Import Rule Required</p>
        <p>Please choose how to handle duplicates before uploading.</p>
      </div>
    </div>
  </template>
  