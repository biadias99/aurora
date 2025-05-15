<template>
  <v-col class="text-h6" md="7" sm="12">
    Activities of the Day
    <v-card class="pa-4 mt-2 lightBorder" elevation="0" rounded="lg">
      <v-row v-for="(activity, index) in activitiesStore.activities" :key="index">
        <v-col cols="12">
          <v-checkbox
            v-model="activity.done"
            :label="activity.name"
            :value="activity.done"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script setup>
  import { useActivityStore } from '@/stores/activities';

  const activitiesStore = useActivityStore();
</script>
