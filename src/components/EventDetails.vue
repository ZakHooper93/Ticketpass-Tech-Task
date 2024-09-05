<template>
    <div class="mx-auto p-4" v-if="event">
        <!-- Event Image -->
        <img :src="event.image" alt="Event Image" class="w-full h-[500px] object-cover rounded-lg shadow-lg" />

        <!-- Event Details Section -->
        <div class="text-center my-8">
            <!-- Event Name -->
            <h1 class="text-4xl font-bold mb-4 text-gray-800">{{ event.title }}</h1>

            <!-- Event Dates -->
            <p class="text-left text-lg text-gray-600 mb-4 italic border-l-4 border-green-500 pl-4">{{ formattedDate }}
            </p>

            <!-- Event Description -->
            <div class="text-left text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-lg shadow-inner"
                v-html="event.description"></div>
        </div>
    </div>

    <!-- Show a loading or error message when event is not available -->
    <div v-else class="text-center text-red-500">
        <p>Loading event details...</p>
    </div>
</template>

<script setup lang="ts">
// Imports.
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// Type Imports.
import type { EventType } from '@/types/EventType';

// State and reactive data.
const route = useRoute();
const eventId = route.params.id;

const event = ref<EventType | null>(null);
const error = ref<string | null>(null);

// Methods.
// Fetch data with error handling.
const fetchEvent = async (id: number) => {
    try {
        console.log('Fetching event with ID:', id);
        const response = await fetch('/data/events-data.json');
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const events = await response.json();
        event.value = events.find((e: EventType) => e.id === id) || null;

        if (!event.value) {
            error.value = 'Event not found';
        }

    } catch (err) {
        console.error('Error fetching event:', err);
        error.value = 'There was an error loading the event details.';
    }
};

// Computed property to format the event date.
const formattedDate = computed(() => {
    if (!event.value) return '';

    const startDate = new Date(event.value.start);
    const endDate = new Date(event.value.end);

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    if (
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()
    ) {
        return startDate.toLocaleDateString(undefined, options);
    } else {
        return `${startDate.toLocaleDateString(undefined, options)} - ${endDate.toLocaleDateString(undefined, options)}`;
    }
});

// Lifecycle hooks.
// Fetch the event data when the component is mounted.
onMounted(() => {
    fetchEvent(Number(eventId));
});
</script>