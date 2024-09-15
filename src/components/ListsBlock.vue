<script setup>
import { db } from '@/assets/firebase';
import SortDropdown from '@/components/dropdowns/SortDropdown.vue';
import { user } from '@/composables/getUser';
import { collection, getDocs, query, where } from "firebase/firestore";
import { computed, onMounted, ref } from 'vue';

// const dummyLists = [
//     {
//         id: 1,
//         name: 'Family',
//         totalContactCount: 10,
//         dateAdded: '09-01-2023'
//     },
//     {
//         id: 2,
//         name: 'Friends',
//         totalContactCount: 24,
//         dateAdded: '09-05-2023'
//     },
//     {
//         id: 3,
//         name: 'Work ',
//         totalContactCount: 87,
//         dateAdded: '09-10-2023'
//     },
//     {
//         id: 5,
//         name: 'Best Friends ',
//         totalContactCount: 12,
//         dateAdded: '09-10-2023'
//     },
//     {
//         id: 6,
//         name: 'Associates',
//         totalContactCount: 26,
//         dateAdded: '09-10-2023'
//     },
//     {
//         id: 4,
//         name: 'Luxury Realtor List 4/1/23',
//         totalContactCount: 1002,
//         dateAdded: '09-25-2023',
//         contacts : [
//             {id: 1, dateAddedToList: '09-25-2023'},
//         ]
//     }
// ];


const lists = ref([]);
const newListName = ref('');
const showNewListForm = ref(false);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substr(-2);
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    return `${month}/${day}/${year}`;
};

const predefinedColors = ['#50b6a8', '#f44336', '#ffeb3b', '#2196f3', '#9c27b0', '#ff9800', '#795548'];
const newListColor = ref(predefinedColors[0]);
const showColorDropdown = ref(false);
function selectColor(color) {
    newListColor.value = color;
    showColorDropdown.value = false; // Close the dropdown after selection
}


async function loadLists() {
    // console.log('CHECKING USER VALUE', user.value.uid);
    if (user.value) {
        const q = query(collection(db, 'lists'), where('userID', '==', user.value.uid));
        // console.log("USER ID LOADING LISTS" ,user.value.uid)
        try {
            const querySnapshot = await getDocs(q);
            // console.log(querySnapshot.size);
            const loadedLists = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                loadedLists.push({
                    id: doc.id,
                    listName: data.listName,
                    userID: data.userID,
                    contacts: data.contacts,
                    dateAdded: data.dateAdded.toDate().toLocaleString(),
                    lastUpdated: data.lastUpdated.toDate().toLocaleString()
                });
            });
            lists.value = loadedLists;
        } catch (error) {
            console.error('Failed to load lists:', error);
        }
    } 
}

async function addNewList() {
    if (newListName.value && user.value) {
        try {
            await addDoc(collection(db, 'lists'), {
                listName: newListName.value,
                userID: user.value.uid,
                contacts: [], // Initialize with no contacts
                dateAdded: new Date(),
                lastUpdated: new Date()
            });
            newListName.value = '';  // Clear input after submission
            showNewListForm.value = false;  // Hide form after submission
            loadLists();  // Refresh the list
        } catch (error) {
            console.error('Error adding new list:', error);
        }
    }
}


onMounted(async () => {
  // Wait for user to be available
  while (!user.value) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  loadLists();
});

/* -----------------------------------------------------------
    PAGINATION
----------------------------------------------------------- */
const filteredLists = computed(() => {
  // If a filter tag is passed, filter the contacts, otherwise show all
  console.log('lists', lists.value);
  return lists.value
});

const currentListPage = ref(1);
const listsPerPage = 5;

const paginatedLists = computed(() => {
    const start = (currentListPage.value - 1) * listsPerPage;
    const end = start + listsPerPage;
    return filteredLists.value.slice(start, end);
});

console.log('paginatedLists', paginatedLists.value);

const totalPages = computed(() => Math.ceil(filteredLists.value.length / listsPerPage)); //replace this with real 

function nextPage() {
    if (currentListPage.value < totalPages.value) {
        currentListPage.value++;
    }
}

function prevPage() {
    if (currentListPage.value > 1) {
        currentListPage.value--;
    }
}
function goToPage(page) {
    currentListPage.value = page;
}


</script>

<template>
    <!-- Details -->
    <div class="flex justify-between items-end my-2">
        <h1 class="text-left text-2xl mt-2">Groups</h1>
        <!-- <p class="text-xs mb-1 font-bold">SORT BY</p> -->


        <div>
            <span class="inline-flex rounded-md border bg-white shadow-sm">
                <button
                class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative border-r border-gray-200"
                title="View Orders"
                @click="showNewListForm = !showNewListForm"
                >
                New
                <svg class="mt-1" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666"><path d="M144-396v-72h288v72H144Zm0-150v-72h432v72H144Zm0-150v-72h432v72H144Zm492 456v-156H480v-72h156v-156h72v156h156v72H708v156h-72Z"/></svg> 
                </button>
                <button
                class="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:relative border-r border-gray-200"
                title="View Orders"
                >
                Edit
                <svg class="ml-1" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#666666"><path d="M144-144v-153l498-498q11-11 24-16t27-5q14 0 27 5t24 16l51 51q11 11 16 24t5 27q0 14-5 27t-16 24L297-144H144Zm549-498 51-51-51-51-51 51 51 51Z"/></svg>   
                </button>
                <SortDropdown />
            </span>
        </div>


    </div>

    
    
    
    <!-- Lists -->
    <div class="bg-white border border-gray-300 rounded-lg shadow-md w-full px-4 pt-4 space-y-2 select-none ">

        <!-- Add New List Form -->
        <div v-if="showNewListForm" class="mb-2 flex items-center">
            <input
                type="text"
                v-model="newListName"
                placeholder="Enter list name"
                class="flex-grow px-3 py-2 border rounded-md mr-1"
            />

            <!-- Color Selector -->
            <!-- <div class="relative">
                <button
                    @click="showColorDropdown = !showColorDropdown"
                    class="w-10 h-10 p-0.5 px-1 rounded-md mr-1 cursor-pointer border border-gray-300"
                    :style="{ backgroundColor: newListColor }"
                    title="Choose list color"
                ></button>

                <div v-if="showColorDropdown" class="absolute z-10 mt-2 w-36 p-2 bg-white border border-gray-300 rounded-md shadow-md">
                    <div class="grid grid-cols-4 gap-2">
                        <div
                            v-for="color in predefinedColors"
                            :key="color"
                            :style="{ backgroundColor: color }"
                            @click="selectColor(color)"
                            :class="{
                            'border-4 border-black': newListColor === color,
                            'cursor-pointer w-8 h-8 rounded-md': true
                            }"
                            title="Choose list color"
                        ></div>
                    </div>
                </div>
            </div> -->

            <button
                @click="addNewList"
                class="bg-my-teal text-white px-3 py-2 rounded-md border border-green-700 hover:bg-my-teal-dark"
            >
                Add
            </button>
        </div>
        <div v-if="showNewListForm">
            <hr class="my-2 border-gray-300" />
        </div>

        <div v-for="list in paginatedLists" :key="list.id">            
            <div class="relative block rounded-md border-2  border-teal-600 shadow-lg p-2 bg-my-teal ">
                <div class="grid grid-cols-20 justify-between items-center h-full px-1 pl-2">
                    <div class="col-span-12 text-left">
                        <h2 class="text-sm font-semibold truncate text-white">{{ list.listName }}</h2>
                    </div>
                    <div class="col-span-4 flex flex-col items-center justify-center ml-2">
                        <p class="text-xs text-white">{{ list.contacts.length }}</p>
                        <p class="text-xs text-white">contacts</p>
                    </div>
                    <div class="col-span-4 text-right">
                        <p class="text-xs text-white">{{ formatDate(list.dateAdded) }}</p>
                    </div>
                </div>
            </div>
        </div>
            


        <!-- PAGINATION -->
        <ol class="flex justify-center gap-1 text-xs font-medium pt-2 pb-4">
            <li>
                <button
                    @click="prevPage"
                    :disabled="currentListPage === 1"
                    class="inline-flex size-8 items-center justify-center rounded border border-gray-2 00 bg-gray-100 text-gray-900 rtl:rotate-180"
                >
                    <span class="sr-only">Prev Page</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </li>

            <li v-for="page in totalPages" :key="page">
                <button
                    @click="goToPage(page)"
                    :class="{'block size-8 rounded border border-gray-2 00 bg-gray-100 text-center leading-8 text-gray-900': page !== currentListPage, 'block size-8 rounded border-my-teal bg-my-teal text-center leading-8 text-white': page === currentListPage}"
                >
                    {{ page }}
                </button>
            </li>

            <li>
                <button
                    @click="nextPage"
                    :disabled="currentListPage === totalPages"
                    class="inline-flex size-8 items-center justify-center rounded border border-gray-200 bg-gray-100 text-gray-900 rtl:rotate-180"
                >
                    <span class="sr-only">Next Page</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </li>
        </ol>

        


    </div>
</template>