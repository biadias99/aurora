<template>
  <v-container>
    <div>
      <v-row>
        <v-col class="text-h6">
          {{ formatted }}
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-h5 font-weight-bold">
          <v-card
            class="pt-5 pl-5 pb-5 lightBorder"
            cover
            elevation="0"
            image="../assets/background.png"
            min-height="200px"
            rounded="lg"
          >
            Good morning, {{ user.firstName }}
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="text-h6" md="7" sm="12">
          Activities of the Day
          <v-card class="pa-4 mt-2 lightBorder" elevation="0" rounded="lg">
            <v-row v-for="(activity, index) in activities" :key="index">
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

        <v-col class="text-h6" md="5" sm="12">
          Progress
          <v-card class="pa-4 mt-2 text-center lightBorder" elevation="0" rounded="lg">
            <v-progress-circular
              color="teal"
              :model-value="50"
              :size="150"
              :width="15"
            >
              1 / {{ activities.length }}
            </v-progress-circular>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
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

        <v-col class="text-h6 " md="5" sm="12">
          Monthly Calendar
          <v-card class="pa-4 mt-2 text-center lightBorder" elevation="0" rounded="lg">
            <vc-calendar
              :attributes="attrs"
              :color="selectedColor"
              :initial-page="{ month: 4, year: 2019 }"
            />
          </v-card>
        </v-col>
      </v-row>

    </div>
  </v-container>
</template>

<script setup>
  import { useDate } from 'vuetify'

  const user = {
    firstName: 'Bianca',
  }
  const date = useDate();

  const formatted = date.format(new Date(), 'fullDateWithWeekday');

  const activities = [
    {
      name: 'Activity 1',
      done: true,
    },
    {
      name: 'Activity 2',
      done: false,
    },
  ];

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

  const selectedColor = ref('blue');
  const attrs = ref([
    {
      key: 'test',
      highlight: true,
      dates: { start: new Date(2019, 3, 15), end: new Date(2019, 3, 19) },
    },
  ]);
</script>
