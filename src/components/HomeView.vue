<template>
    <!-- Event card grid -->
    <div class="flex flex-col items-center justify-center min-h-screen p-8">
        <div class="grid gap-8 w-[80%] mb-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-8 mx-16">
            <EventCard v-for="(event, index) in paginatedEvents" :key="event.id" :event="event" />
        </div>

        <!-- Pagination Controls -->
        <div class="flex flex-wrap justify-center items-center space-x-2 mt-8">
            <button @click="prevPage" :disabled="currentPage === 1"
                class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50 mb-2">
                Previous
            </button>
            <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                :class="['font-semibold py-2 px-4 rounded mb-2', { 'bg-green-500 text-white': currentPage === page, 'bg-gray-300 text-gray-700': currentPage !== page }]">
                {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage >= totalPages"
                class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded disabled:opacity-50 mb-2">
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
// Imports.
import { ref, computed, onMounted } from 'vue';
import { EventCard } from '@/components';

// Type imports.
import type { EventType } from '@/types/EventType';

// Reactive Data.
const events = ref<EventType[]>([]);
const currentPage = ref<number>(1);
const eventsPerPage = 8;

// Computed properties.
// Compute the total number of pages.
const totalPages = computed(() => {
    return Math.ceil(events.value.length / eventsPerPage);
});

// Compute the paginated events based on the current page.
const paginatedEvents = computed(() => {
    const start = (currentPage.value - 1) * eventsPerPage;
    const end = start + eventsPerPage;
    return events.value.slice(start, end);
});

// Methods.
// Retrieve event data from dummy data file provided.
// Assign to reactive state.
const fetchData = async () => {
    const url = '/data/events-data.json';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        events.value = data;
    } catch (err) {
        console.error('Error fetching data:', err);
    }
};

// Functions to handle pagination.
const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
    }
};

const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
    }
};

const goToPage = (page: number) => {
    currentPage.value = page;
};

// Lifecycle hooks.
// Fetch data on mount .
onMounted(() => {
    fetchData();
});
</script>