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
        name: 'Luxury Realtor List 4/1/23',
        totalContactCount: 1002,
        dateAdded: '09-25-2023',
        contacts : [
            {id: 1, dateAddedToList: '09-25-2023'},
        ]
    }
];

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substr(-2);
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    return `${month}/${day}/${year}`;
};

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
                <div class="grid grid-cols-20 justify-between items-center h-full px-1 pl-2">
                    <div class="col-span-12 text-left">
                        <h2 class="text-sm font-semibold truncate">{{ list.name }}</h2>
                    </div>
                    <div class="col-span-4 flex flex-col items-center justify-center ml-2">
                        <p class="text-xs text-gray-500">{{ list.totalContactCount }}</p>
                        <p class="text-xs text-gray-500">contacts</p>
                    </div>
                    <div class="col-span-4 text-right">
                        <p class="text-xs text-gray-500">{{ formatDate(list.dateAdded) }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>