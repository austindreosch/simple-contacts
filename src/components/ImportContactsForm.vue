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
    <div class="max-w-xl mx-auto justify-center">
        <div class="flex justify-between items-end pt-12">
            <!-- <h1 class="text-left text-2xl">Import CSV</h1> -->
        </div>
        <div class="bg-white w-full px-6 py-8 h-86 space-y-6 rounded-md h-70 border-2 border-gray-200 shadow-md">
            <p class="">
                To import your contacts, press the button below to upload your files in CSV format.
            </p>
            <p class="">
                You can also <a :href="dummyDataCSV" class="text-orange-500">download our sample contacts</a> to test the app.
            </p>
            <!-- Question 1 -->
            <div class="border border-gray-300 p-2 rounded-md bg-gray-200">
                <div class="bg-blue-400 rounded-md px-4 py-4 mb-3">
                    <p class="font-bold text-white "> When importing a contact with an email that is already assigned to a contact previously imported, how would you like to manage the import?</p>
                </div>
                <div class="flex justify-center space-x-4">
                    <div>
                        <input type="radio" id="update" :value=true class="mr-1" v-model="updateDuplicatesFromCSV">
                        <label for="update" class="">Update contact from import data.</label>
                    </div>
                    <div>
                        <input type="radio" id="replace" :value=false class="mr-1" v-model="updateDuplicatesFromCSV">
                        <label for="replace" class="">Keep previous contact data.</label>
                    </div>
                </div>
            </div>
            <!-- Question 2 -->
            <div class="border border-gray-300 p-2 rounded-md bg-gray-200">
                <div class="bg-blue-400 rounded-md px-4 py-4 mb-3">
                    <p class="font-bold text-white "> Would you like to add your imports to a contact list?</p>
                </div>
                <div class="flex justify-center space-x-4">
                    <div>
                        <label for="addList" class="flex justify-between mr-2">
                            Add to new list: 
                            <FullCheckmark class="text-green-500" v-if="!(newListName === '')"/>
                        </label>
                        <input type="text" id="addList" v-model="newListName" class="mr-1 border rounded-sm border-gray-500 ">
                    </div>
                    <div>
                        <label for="selectList" class="flex justify-between mr-2">
                            Add to existing list: 
                            <FullCheckmark class="text-green-500 fill-current" v-if="!(selectedList === 'Select a list...')"/>
                        </label>
                        <select id="selectList" v-model="selectedList" class="mr-1 border rounded-sm border-gray-500">
                            <option  >Select a list...</option>
                            <option v-for="list in dummyLists" :key="list.id" :value="list.id">{{ list.name }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-span-1">
                <!-- Alert -->

                <!-- Upload Button -->
                <label for="file-upload" class="relative cursor-pointer flex items-center justify-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-md text-gray-700 bg-orange-200 hover:bg-orange-100" @click="checkImportRule">
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" :disabled="showAlert" @change="importCSV">
                    <Upload class="mx-auto text-orange-900"/>
                </label>
            </div>
        </div>
        <div v-if="showAlert" class="alert alert-danger bg-red-400 p-3 my-4 rounded text-white text-lg">
            Please choose an import rule before uploading.
        </div>
    </div>
</template>