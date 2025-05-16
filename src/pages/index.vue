<template>
  <v-container>
    <DateCard />

    <MorningCard />

    <v-row>
      <DayActivities />
      <Progress />
    </v-row>

    <Calendar />
  </v-container>
</template>

<script setup>
  import { useActivityStore } from '../stores/activities';
  import Calendar from '../components/Calendar.vue';
  import { formatStartEndDate } from '../composables/formatStartEndDate';

  const activitiesStore = useActivityStore();

  onMounted(() => {
    if (!activitiesStore.dayActivities.length) {
      const date = formatStartEndDate(new Date());
      activitiesStore.getDayActivities(date, true);
    }
  });

</script>
