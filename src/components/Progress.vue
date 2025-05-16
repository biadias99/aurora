<template>
  <v-col class="text-h6" md="5" sm="12">
    Progress of the Day
    <v-card class="pa-4 mt-2 text-center lightBorder" elevation="0" rounded="lg">
      <v-progress-circular
        color="teal"
        :model-value="percentage"
        :size="150"
        :width="15"
      >
        {{ activitiesStore.completedDayActivities.length }} / {{ activitiesStore.dayActivities.length }}
      </v-progress-circular>
    </v-card>
  </v-col>
</template>

<script setup>
  import { computed } from 'vue';
  import { useActivityStore } from '@/stores/activities';

  const activitiesStore = useActivityStore();

  const percentage = computed(() => {
    if (activitiesStore.completedDayActivities.length && activitiesStore.dayActivities.length) {
      return (activitiesStore.completedDayActivities.length / activitiesStore.dayActivities.length) * 100;
    }
    return 0;
  });
</script>
