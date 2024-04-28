<script setup>
import { db } from '@/assets/firebase';
import FullCheckmark from '@/assets/full-checkmark.svg';
import Upload from '@/assets/upload.svg';
import { addDoc, collection } from 'firebase/firestore';
import Papa from 'papaparse';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
//To be replaced later.
const user = { id: 'user1', email: 'john@doe.com' }
const updateDuplicatesFromCSV = ref(false);

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

        return {
            email: emailHeader ? row[emailHeader] : '',
            phone: phoneHeader ? row[phoneHeader] : '',
            firstName: firstNameHeader ? row[firstNameHeader] : '',
            lastName: lastNameHeader ? row[lastNameHeader] : '',
            note: noteHeader ? row[noteHeader] : '',
            tags: tagsHeader ? row[tagsHeader] : ''
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

            // console.log('Raw File Results:', results.data);
            const headers = results.meta.fields;
            const processedData = await processData(results.data, headers);
            console.log('processedData:', processedData);
            // Add these contacts to a list?

            // console.log('db', db)
            processedData.forEach(async (contact) => {

                //if updateDuplicatesFromCSV is true
                //if contact with same email exists, update the rest with no info

                // else addDoc
                const docRef = await addDoc(collection(db, "contacts"), {
                    userId: user.id,
                    email: contact.email,
                    phone: contact.phone,
                    firstName: contact.firstName,
                    lastName: contact.lastName,
                    note: contact.note,
                    tags: contact.tags
                });
            });

            // router.push('/');
        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
        }
    });
}

</script>

<template>
    <div>
        <div class="flex justify-between items-end">
            <h1 class="text-left text-2xl">Import CSV</h1>
            <!-- <p class="text-xs mb-1 font-bold">DELETE CONTACT</p> -->
        </div>
        <div class="bg-gray-200 w-full px-6 py-8 h-86 space-y-8 rounded-md h-70">
            <p class="font-bold">
                To import your contacts, press the button below to upload your files in CSV format.
            </p>
            <p>
                If you'd like to get started testing the app you can also <a :href="dummyDataCSV" class="text-blue-500">download our sample contacts.</a>
            </p>

            <p>
                If the case of duplicate emails, the existing contact will be updated with the new information.
            </p>
            <div class="col-span-1">
                <label for="file-upload" class="relative cursor-pointer flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" @change="importCSV">
                    <Upload class="mx-auto"/>
                    <!-- <span>Upload a file</span> -->
                </label>

            </div>
        </div>
    </div>
</template>