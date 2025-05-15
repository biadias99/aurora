<template>
  <v-col class="text-h6" md="7" sm="12">
    Weekly Calendar
    <v-card class="pa-4 mt-2 lightBorder" elevation="0" rounded="lg">
      <v-pagination
        v-model="page"
        :length="7"
        :total-visible="7"
      />
      <v-row>
        <v-col
          v-for="(activity, index) in activitiesWeek"
          :key="index"
          cols="12"
        >
          <v-card
            class="ma-2"
            elevation="0"
            rounded="lg"
          >
            <v-card-title
              class="text-body-1
"
            >{{ activity.time }} - {{ activity.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script setup>
  const activitiesWeek = [
    {
      name: 'Activity 1',
      done: true,
      time: '09:00',
    },
    {
      name: 'Activity 2',
      done: false,
      time: '10:00',
    },
  ];
</script>
