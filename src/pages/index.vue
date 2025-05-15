<template>
  <v-container>
    <DateCard />

    <MorningCard />

    <v-row>
      <DayActivities />
      <Progress />
    </v-row>

    <v-row>
      <WeeklyCalendar />

      <MonthlyCalendar />
    </v-row>
  </v-container>
</template>

<script setup>
  import { useActivityStore } from '../stores/activities';
  import MonthlyCalendar from '../components/MonthlyCalendar.vue';
  import WeeklyCalendar from '../components/WeeklyCalendar.vue';

  const activitiesStore = useActivityStore();

  onMounted(() => {
    if (!activitiesStore.activities.length) {
      activitiesStore.getActivities();
    }
  });

</script>
