<script setup>
import { db } from '@/assets/firebase';
import FullCheckmark from '@/assets/full-checkmark.svg';
import Upload from '@/assets/upload.svg';
import { addDoc, collection, doc, query, updateDoc } from 'firebase/firestore';
import Papa from 'papaparse';
import { defineProps, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
//To be replaced later.
const user = { id: 'user1' }
const props = defineProps({ contacts: Array });

const updateDuplicatesFromCSV = ref(null);
const showAlert = ref(false);

const dummyDataCSV = 'https://drive.usercontent.google.com/download?id=1KYAl5y9q-wrZRzAEDG6ueseQs6Tb_rrL&export=download&authuser=0'
const shortDummyDataCSV = 'https://drive.usercontent.google.com/download?id=1yuQHUlnp7bttHy1ivAIVROA-cf8Zg146&export=download&authuser=0'

const processData = async (csvData, headers) => {
    /* -----------------------------------------------------------
    *  Process the CSV data to extract the relevant columns
    ----------------------------------------------------------- */
    // Email    
    const emailRegex = /email|e[-\s]?mail/i;
    const emailIndex = headers.findIndex(header => emailRegex.test(header));
    //Phone
    const phoneRegex = /phone|tel|telephone|cell\s*phone|mobile\s*phone|contact\s*number|#/i
    const phoneIndex = headers.findIndex(header => phoneRegex.test(header));
    // Name
    const nameColumnIndex = headers.findIndex(header => /name/i.test(header));
    let firstNameIndex, lastNameIndex;
    if (nameColumnIndex !== -1) { // Name column found
        // Check if there's only one name column
        if (nameColumnIndex !== headers.lastIndexOf(headers)) {
            // Treat as separate first and last name columns
            firstNameIndex = headers.findIndex(header => /first\s*name/i.test(header));
            lastNameIndex = headers.findIndex(header => /last\s*name/i.test(header));
        } else {
            // Treat as a single full name column, assuming the full name is in the format "First Last"
            const fullName = headers[nameColumnIndex];
            const [firstName, lastName] = fullName.split(/\s+/);
            if (firstName && lastName) {
                firstNameIndex = nameColumnIndex;
                lastNameIndex = -1; // Not needed if it's a full name
            }
        }
    }
    // Note and Tags
    const noteRegex = /note|remarks|comment/i;
    const noteIndex = headers.findIndex(header => noteRegex.test(header));
    const tagsRegex = /tags|labels|categories/i;
    const tagsIndex = headers.findIndex(header => tagsRegex.test(header));

    const processedValues = csvData.map(row => {
        const emailHeader = headers[emailIndex];
        const phoneHeader = headers[phoneIndex];
        const firstNameHeader = headers[firstNameIndex];
        const lastNameHeader = headers[lastNameIndex];
        const noteHeader = headers[noteIndex];
        const tagsHeader = headers[tagsIndex];

        console.log('row:', row[tagsHeader]);
        return {
            email: emailHeader ? row[emailHeader] : '',
            phone: phoneHeader ? row[phoneHeader] : '',
            firstName: firstNameHeader ? row[firstNameHeader] : '',
            lastName: lastNameHeader ? row[lastNameHeader] : '',
            note: noteHeader ? row[noteHeader] : '',
            tags: tagsIndex !== -1 ? row[headers[tagsIndex]].split(',').map(tag => tag.trim()) : []

        };
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
            console.log('processedData:', processedData);

            const existingContacts = new Map(props.contacts.map(contact => [contact.email, contact.id]));

            processedData.forEach(async (contact) => {
                //check if contact with same email exists
                // if exists, use conditional logic to update data or not

                //Handle duplicates 
                if (existingContacts.has(contact.email)){
                    //if updateDuplicatesFromCSV is true, update contacts at all data points except email
                    if (updateDuplicatesFromCSV.value === true) {
                        //update contact all over dat points except with same email
                        const contactId = existingContacts.get(contact.email);
                        const contactRef = doc(db, 'contacts', contactId);
                        await updateDoc(contactRef, {
                            userId: user.id,
                            phone: contact.phone,
                            firstName: contact.firstName,
                            lastName: contact.lastName,
                            note: contact.note,
                            tags: contact.tags
                        });
                        
                    } 
                } else {
                    //Add new contact
                    const docRef = await addDoc(collection(db, "contacts"), {
                        userId: user.id,
                        email: contact.email,
                        phone: contact.phone,
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        note: contact.note,
                        tags: contact.tags
                    });
                }
            });
                //if contact with same email exists, update the rest with no info

                // else addDoc

            router.push('/');
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
        }
    });
}

function checkSelection() {
    if (updateDuplicatesFromCSV.value === null) {
        showAlert.value = true;
    } else {
        showAlert.value = false;
    }
}



</script>

<template>
    <div class="max-w-xl mx-auto justify-center">
        <div class="flex justify-between items-end">
            <h1 class="text-left text-2xl">Import CSV</h1>
            <!-- <p>Show Alert? {{ String(showAlert) }}</p> -->

        </div>
        <div class="bg-gray-200 w-full px-6 py-8 h-86 space-y-6 rounded-md h-70">
            <p class="">
                To import your contacts, press the button below to upload your files in CSV format.
            </p>
            <p class="">
                You can also <a :href="dummyDataCSV" class="text-orange-500">download our sample contacts</a> to test the app.
            </p>
            
            <div class="border border-gray-300 p-2 rounded-md bg-gray-100">
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
            <div class="col-span-1">
                <!-- Alert -->

                <!-- Upload Button -->
                <label for="file-upload" class="relative cursor-pointer flex items-center justify-center px-4 py-2 border border-orange-300 text-sm font-medium rounded-md text-gray-700 bg-orange-200 hover:bg-orange-100" @click="checkSelection">
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