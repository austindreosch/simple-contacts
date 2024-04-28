<script setup>

const dummyLists = [
    {
        id: 1,
        name: 'Family',
        totalContactCount: 10,
        dateAdded: '09-01-2023'
    },
    {
        id: 2,
        name: 'Friends',
        totalContactCount: 24,
        dateAdded: '09-05-2023'
    },
    {
        id: 3,
        name: 'Work ',
        totalContactCount: 87,
        dateAdded: '09-10-2023'
    },
    {
        id: 4,
        name: 'Neighbors',
        totalContactCount: 12,
        dateAdded: '09-25-2023'
    }
];

// Load lists from the database
async function loadLists() {
    // Load lists from the database
}


</script>

<template>
    <div class="flex justify-between items-end">
        <h1 class="text-left text-2xl mt-2">Lists</h1>
        <p class="text-xs mb-1 font-bold">SORT BY</p>
    </div>
    <div class="bg-gray-200 w-full px-6 py-4 h-64 space-y-2">
        <!------------------------ 
            FEED LISTS DATA HERE 
        -------------------------->
        <div v-for="list in dummyLists" :key="list.id">
            <div class="h-12 flex-grow bg-blue-200  rounded border border-blue-300 mt-1">
                <div class="flex justify-between items-center h-full px-4">
                    <div>
                        <h2 class="text-lg font-semibold">{{ list.name }}</h2>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">{{ list.totalContactCount }} contacts</p>
                    </div>
                    <div>
                        <p class="text-xs text-gray-500">{{ list.dateAdded }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>