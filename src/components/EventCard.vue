<template>
    <!-- Main card -->
    <div class="bg-white shadow-xl rounded-xl p-2 flex flex-col items-center">
        <img :src="event.image" alt="Event Image" class="w-full h-auto rounded-md mb-4" />
        <h2 class="text-xl font-bold mb-2">{{ event.title }}</h2>
        <p class="text-gray-600 mb-4">{{ formattedDate }}</p>

        <!-- Button to view event details -->
        <RouterLink :to="{ name: 'EventDetails', params: { id: event.id } }">
            <button class="bg-green-500 text-white font-semibold py-2 px-4 rounded-full">View</button>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
//Imports.
import { computed, defineProps } from 'vue';

// Type imports.
import type { EventType } from '@/types/EventType';

// Define props.
const props = defineProps<{
    event: EventType
}>();

// Computed properties.
// Computed property to format start and end dates separately.
const formattedDate = computed(() => {
    const startDate = new Date(props.event.start);
    const endDate = new Date(props.event.end);

    // Check if start and end dates are the same day.
    if (
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()
    ) {
        return formatDate(startDate); // If same date, show once.
    } else {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`; // If different, show both.
    }
});

// Methods
// Function to format date to 'Wed, Sep 4, 2024' format.
function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',  // "Wed"
        year: 'numeric',   // "2024"
        month: 'short',    // "Sep"
        day: 'numeric'     // "4"
    };
    return date.toLocaleDateString(undefined, options);
}
</script>