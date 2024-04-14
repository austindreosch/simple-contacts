<script setup>

</script>

<template>
    <div class="flex justify-between items-end">
        <h1 class="text-left text-2xl">Details</h1>
        <p class="text-xs mb-1">DELETE CONTACT</p>
    </div>
    <div class="bg-gray-200 w-full px-6 py-4 h-86 justify-center space-y-2">
        <!-- NAMES -->
        <div class="grid grid-cols-2 space-x-4 ">
            <div class="col-span-1">
                <p class="text-left mb-1 ml-2 text-xs">FIRST NAME</p>
                <input type="text" class="max-w-full ">
            </div>
            <div class="col-span-1">
                <p class="text-left mb-1 ml-2 text-xs">LAST NAME</p>
                <input type="text" class="max-w-full pl-0 pr-0">
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
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-4 rounded h-2/4 w-full">
                    <svg class="mx-auto w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 1 0-18c1.052 0 2.062.18 3 .512M7 9.577l3.923 3.923 8.5-8.5M17 14v6m-3-3h6"/>
                    </svg>

                </button>
            </div>
        </div>
    </div>
</template>