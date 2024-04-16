<script setup>
import FullCheckmark from '@/assets/full-checkmark.svg';
import Upload from '@/assets/upload.svg';
</script>

<template>
    <div class="flex justify-between items-end">
        <h1 class="text-left text-2xl">Import CSV</h1>
        <!-- <p class="text-xs mb-1 font-bold">DELETE CONTACT</p> -->
    </div>
    <div class="bg-gray-200 w-full px-6 py-4 h-86 justify-center space-y-2">
        <p>
            Import your contacts by uploading a CSV file. 
            <a href="#" class="text-blue-500">Download a sample CSV</a> to get started.
        </p>
        <div class="col-span-1">
            <button class="bg-blue-500 hover:bg-blue-300 font-bold px-4 rounded h-2/4 w-full">
                <Upload class="mx-auto text-white"/>
            </button>
        </div>
    </div>
</template>