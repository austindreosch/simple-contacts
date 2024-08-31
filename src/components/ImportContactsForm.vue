<script setup>
import { db } from '@/assets/firebase';
import FullCheckmark from '@/assets/full-checkmark.svg';
import Upload from '@/assets/upload.svg';
import { user } from '@/composables/getUser';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { isValidNumber, parsePhoneNumberFromString } from 'libphonenumber-js';
import Papa from 'papaparse';
import validator from 'validator';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps({ contacts: Array });
const tagToContactsMap = new Map();


const dummyDataCSV = 'https://drive.usercontent.google.com/download?id=1M3dbgvoswoscYwuk92i2iMyt_SXUz6OQ&export=download&authuser=0'
const shortDummyDataCSV = 'https://drive.usercontent.google.com/download?id=1yuQHUlnp7bttHy1ivAIVROA-cf8Zg146&export=download&authuser=0'


const updateDuplicatesFromCSV = ref(null);
const showAlert = ref(false);
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

    const processedValues = csvData.map(row => {
        //Gather the column index values for each header
        const emailHeader = headers[emailIndex];
        const phoneHeader = headers[phoneIndex];
        const firstNameHeader = headers[firstNameIndex];
        const lastNameHeader = headers[lastNameIndex];
        const noteHeader = headers[noteIndex];
        const tagsHeader = headers[tagsIndex]; 

        // Email
        const email = emailHeader ? row[emailHeader] : '';
        if (!email || !validator.isEmail(email)) {  // Add validation for empty and invalid email
            errors.missingEmails.push(row);
        }

        // Phone
        let phone = phoneIndex !== -1 ? row[phoneHeader] : '';
        if (phone && !isValidNumber(phone)) {  // Add validation for invalid phone
            errors.missingPhones.push(row);
        } else if (phone) {
            const phoneNumber = parsePhoneNumberFromString(phone);
            phone = phoneNumber ? phoneNumber.formatInternational() : '';
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
 
        // Gather tags and associated contacts using contact document IDs
        tags.forEach(tag => {
            if (!tagToContactsMap.has(tag)) {
                tagToContactsMap.set(tag, []);
            }
            const contactId = existingContacts.get(row[emailHeader]);
            if (contactId) {
                tagToContactsMap.get(tag).push(contactId); 
            }
        });
        

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
            // const processedData = await processData(results.data, headers);
            // console.log('processedData:', processedData);

            const existingContacts = new Map((props.contacts || []).map(contact => [contact.email, contact.id]));
            // console.log('existingContacts:', existingContacts); //NEED TO VALIDATE THAT THIS WORKS
            const processedData = await processData(results.data, headers, existingContacts);

            let listRef;
            if (selectedList.value !== 'Select a list...' && selectedList.value) {
                listRef = doc(db, 'lists', selectedList.value);
                await updateDoc(listRef, {
                    lastUpdated: new Date().toISOString()
                });
            } else if (newListName.value !== '') {
                const newList = await addDoc(collection(db, "lists"), {
                    userId: user.value.uid,
                    listName: newListName.value,
                    dateAdded: new Date().toISOString(),
                    lastUpdated: new Date().toISOString(),
                    contacts: []
                });
                listRef = doc(db, 'lists', newList.id);
            }

            if (processedData && processedData.length > 0) { // Safeguard
                processedData.forEach(async (contact) => {
                    if (existingContacts.has(contact.email)) {
                        if (updateDuplicatesFromCSV.value === true) {
                            const contactId = existingContacts.get(contact.email);
                            const contactRef = doc(db, 'contacts', contactId);
                            await updateDoc(contactRef, {
                                userId: user.value.uid,
                                phone: contact.phone,
                                firstName: contact.firstName,
                                lastName: contact.lastName,
                                note: contact.note,
                                tags: contact.tags
                            });
                            console.log('Contact updated:', contactId);
                        } else {
                            console.log('Contact found but not updated:', contact.email);
                        }
                    } else {
                        const docRef = await addDoc(collection(db, "contacts"), {
                            userId: user.value.uid,
                            email: contact.email,
                            phone: contact.phone,
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            note: contact.note,
                            tags: contact.tags
                        });
                        console.log('Contact added with ID:', docRef.id);

                        if (listRef) {
                            const listDoc = await getDoc(listRef);
                            if (listDoc.exists()) {
                                const listData = listDoc.data();
                                listData.contacts.push(docRef.id);
                                await updateDoc(listRef, { contacts: listData.contacts });
                                console.log('Contact added to list:', listRef.id);
                            }
                        }
                    }
                });
            } else {
                console.log('No valid contacts processed.');
            }



            /* -----------------------------------------------------------
            *  Add tags and associated contacts to the tags collection
            ----------------------------------------------------------- */

            for (const [tag, contactIds] of tagToContactsMap) {
                const tagRef = collection(db, "tags");
                await addDoc(tagRef, {
                    userId: user.value.uid,
                    tagName: tag,
                    contacts: contactIds,  // List of associated contact document IDs
                    dateAdded: new Date().toISOString(),
                });
                console.log(`Tag added: ${tag} with contacts: ${contactIds}`);
            }







            router.push('/');
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
        }
    });
}

function checkImportRule() {
    if (updateDuplicatesFromCSV.value === null) {
        showAlert.value = true;
    } else {
        showAlert.value = false;
    }
}

</script>

<template>
    <div class="max-w-[38rem] mx-auto justify-center">
        <div class="flex justify-between items-end pt-12">
            <!-- <h1 class="text-left text-2xl">Import CSV</h1> -->
            <!-- <p>Show Alert? {{ String(showAlert) }}</p> -->

        </div>
        <div class="bg-white w-full px-6 py-8 h-86 space-y-6 rounded-md h-70 border border-gray-200">
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
                        <input type="radio" id="update" value=true class="mr-1" v-model="updateDuplicatesFromCSV">
                        <label for="update" class="">Update contact from import data.</label>
                    </div>
                    <div>
                        <input type="radio" id="replace" value=false class="mr-1" v-model="updateDuplicatesFromCSV">
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
                            Add a new list: 
                            <FullCheckmark class="text-green-500" v-if="!(newListName === '')"/>
                        </label>
                        <input type="text" id="addList" v-model="newListName" class="mr-1 border rounded-sm border-gray-500 h-8">
                    </div>
                    <div class="pr-11">
                        <label for="selectList" class="flex justify-between mr-2">
                            Add to existing list: 
                            <FullCheckmark class="text-green-500 fill-current" v-if="!(selectedList === 'Select a list...')"/>
                        </label>
                        <select id="selectList" v-model="selectedList" class="border rounded-sm border-gray-500 h-8 w-[130%]">
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