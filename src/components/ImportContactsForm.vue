<script setup>
import FullCheckmark from '@/assets/full-checkmark.svg';
import Upload from '@/assets/upload.svg';

//To be replaced later.
const user = { id: 'user1', email: 'john@doe.com' }
const dummyDataCSV = 'https://drive.usercontent.google.com/download?id=1KYAl5y9q-wrZRzAEDG6ueseQs6Tb_rrL&export=download&authuser=0'

const shortDummyDataCSV = 'https://drive.usercontent.google.com/download?id=1yuQHUlnp7bttHy1ivAIVROA-cf8Zg146&export=download&authuser=0'

function importCSV(file) {
    // First Name, Last Name, Email, Note, Phone, Tags

    Papa.parse(file, {
        header: true, // Treat the first row as headers
        complete: function(results) {
            const processedData = processData(results.data);

            console.log(processedData);
            // Save to database
            // Add these contacts to a list?
            // Emit an event to refresh the contacts list
            

        },
        error: function(error) {
            console.error('Error parsing CSV:', error);
        }
    });
}

const processData = (csvData) => {
    const headers = csvData[0];
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
        if (nameColumnIndex !== headers.lastIndexOf(header)) {
            // Treat as separate first and last name columns
            firstNameIndex = headers.findIndex(header => /first\s*name/i.test(header));
            lastNameIndex = headers.findIndex(header => /last\s*name/i.test(header));
        } else {
            // Treat as a single full name column, assuming the full name is in the format "First Last"
            const fullName = headers[nameColumnIndex];
            const [firstName, lastName] = fullName.split(/\s+/);
            if (firstName && lastName) {
                // Set the indices for first and last name accordingly
                firstNameIndex = nameColumnIndex;
                lastNameIndex = -1; // Not needed if it's a full name
            }
        }
    }
    // Note and Tags
    const noteIndex = headers.indexOf('Note');
    const tagsIndex = headers.indexOf('Tags');


    const processedValues = csvData.slice(1).map(row => ({
        email: emailIndex !== -1 ? row[emailIndex] : '',
        phone: phoneIndex !== -1 ? row[phoneIndex] : '',
        firstName: firstNameIndex !== -1 ? row[firstNameIndex] : '',
        lastName: lastNameIndex !== -1 ? row[lastNameIndex] : '',
        note: noteIndex !== -1 ? row[noteIndex] : '',
        tags: tagsIndex !== -1 ? row[tagsIndex] : ''
    }));

    return processedValues;
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
            <div class="col-span-1">
                <button class="bg-blue-500 hover:bg-blue-300 font-bold px-4 rounded h-2/4 w-2/4">
                    <Upload class="mx-auto text-white "/>
                </button>
            </div>
        </div>
    </div>
</template>