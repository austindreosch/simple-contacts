<script setup>
import FullCheckmark from '@/assets/full-checkmark.svg';

</script>

<template>
    <div class="flex justify-between items-end">
        <h1 class="text-left text-2xl">Details</h1>
        <p class="text-xs mb-1 font-bold">DELETE CONTACT</p>
    </div>
    <div class="bg-gray-200 w-full px-6 py-4 h-86 justify-center space-y-2">
        <!-- NAMES -->
        <div class="grid grid-cols-2 space-x-4 ">
            <div class="col-span-1">
                <p class="text-left mb-1 ml-2 text-xs">FIRST NAME</p>
                <input type="text" class="w-full ">
            </div>
            <div class="col-span-1">
                <p class="text-left mb-1 ml-2 text-xs">LAST NAME</p>
                <input type="text" class="w-full pl-0 pr-0">
            </div>
        </div>
        <!-- EMAIL -->
        <div>
            <p class="text-left mb-1 ml-2 text-xs">EMAIL</p>
            <input type="text" class="max-w-full w-full">
        </div>
        <!-- NOTE & PHONE -->
        <div class="grid grid-cols-10 space-x-4 ">
            <div class="col-span-6">
                <p class="text-left mb-1 ml-2 text-xs">NOTE</p>
                <input type="text" class="max-w-full w-full">
            </div>
            <div class="col-span-4">
                <p class="text-left mb-1 ml-2 text-xs">PHONE</p>
                <input type="phone" class="max-w-full  pl-0 pr-0">
            </div>
        </div>
        <!-- TAGS & SAVE -->
        <div class="grid grid-cols-4 space-x-2">
            <div class="col-span-3">
                <p class="text-left mb-1 ml-2 text-xs">TAGS</p>
                <input type="text" class="max-w-full w-full h-16">
            </div>
            <div class="col-span-1">
                <p class="text-left mb-1 ml-1.5 text-xs">SAVE</p>
                <button class="bg-blue-500 hover:bg-blue-300 font-bold px-4 rounded h-2/4 w-full">
                    <FullCheckmark class="mx-auto text-white"/>
                </button>
            </div>
        </div>
    </div>
</template>