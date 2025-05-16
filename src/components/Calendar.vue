<template>
  <v-row>
    <v-col class="text-h6">
      Calendar
      <v-card class="pa-2 mt-2 lightBorder" elevation="0" rounded="lg">
        <v-row>
          <v-col md="7" sm="12">
            <v-card class="ma-4" elevation="0" rounded="lg">
              <v-data-table :headers="headers" :items="activitiesStore.monthlyActivities">
                <template #item.done="{ item }">
                  <v-checkbox-btn
                    v-model="item.done"
                    :ripple="false"
                    @click="updateDone(item.id, !item.done)"
                  />
                </template>

                <template #item.actions="{ item }">
                  <div class="d-flex ga-2 justify-end">
                    <v-icon color="medium-emphasis" icon="mdi-pencil" size="small" @click="edit(item.id)" />

                    <v-icon color="medium-emphasis" icon="mdi-delete" size="small" @click="remove(item.id)" />
                  </div>
                </template>
              </v-data-table>
            </v-card>
          </v-col>

          <v-col md="5" sm="12">
            <vc-date-picker
              v-model="selectedDate"
              color="purple"
              expanded
              mode="date"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <FormActivity
    :dialog="dialog"
    :is-editing="true"
    :record="record"
    @save="saveEdit"
    @update:dialog="dialog = $event"
  />
</template>

<script setup>
  import { useActivityStore } from '@/stores/activities';
  import { formatToDate } from '../composables/formatToDate';
  import { ref, watch } from 'vue';
  import { formatStartEndDate } from '../composables/formatStartEndDate';
  import { dateToTimestamp } from '../composables/dateToTimestamp';

  const activitiesStore = useActivityStore();

  const headers = [
    { title: 'Done', value: 'done' },
    { title: 'Name', value: 'name' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ]

  const { formatTimestampToDate } = formatToDate();

  const DEFAULT_RECORD = { name: '', done: false, date: '' }
  const record = ref(DEFAULT_RECORD);
  const dialog = shallowRef(false);

  const selectedDate = ref(activitiesStore.selectedDate);

  watch(
    selectedDate,
    onSelectedDateChanged
  );

  function onSelectedDateChanged () {
    const date = new Date(selectedDate.value);
    const formattedDate = formatStartEndDate(date);

    activitiesStore.setSelectedDate(date);
    activitiesStore.getMonthlyActivities(formattedDate);
  }

  function edit (id) {
    const found = activitiesStore.dayActivities.find(x => x.id === id);
    const formattedDate = formatTimestampToDate(found.date);

    record.value = {
      id: found.id,
      name: found.name,
      done: found.done,
      date: formattedDate,
    }

    dialog.value = true
  }

  async function saveEdit (localRecord) {
    await activitiesStore.updateWholeActivity({
      id: localRecord.id,
      name: localRecord.name,
      done: localRecord.done,
      date: dateToTimestamp(localRecord.date),
    });

    dialog.value = false
  }

  async function updateDone (id, done) {
    await activitiesStore.updateActivity(id, done);
  }

  async function remove (id) {
    await activitiesStore.deleteActivity(id);
  }
</script>
