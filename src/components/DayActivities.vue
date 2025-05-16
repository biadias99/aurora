<template>
  <v-col class="text-h6" md="7" sm="12">
    Activities of the Day
    <v-card class="pa-4 mt-2 lightBorder" elevation="0" rounded="lg">
      <v-col>
        <v-data-table :headers="headers" :items="activitiesStore.dayActivities">
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
      </v-col>
    </v-card>
  </v-col>

  <FormActivity
    :dialog="dialog"
    :is-editing="true"
    :record="record"
    @save="saveEdit"
    @update:dialog="dialog = $event"
  />
</template>

<script setup>
  import { ref, shallowRef } from 'vue'
  import { useActivityStore } from '@/stores/activities';
  import { formatToDate } from '../composables/formatToDate';
  import { dateToTimestamp } from '../composables/dateToTimestamp';
  import FormActivity from './FormActivity.vue';

  const activitiesStore = useActivityStore();
  const { formatTimestampToDate } = formatToDate();

  const DEFAULT_RECORD = { name: '', done: false, date: '' }
  const record = ref(DEFAULT_RECORD);
  const dialog = shallowRef(false);

  const headers = [
    { title: 'Done', value: 'done' },
    { title: 'Name', value: 'name' },
    { title: 'Actions', key: 'actions', align: 'end', sortable: false },
  ]

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
