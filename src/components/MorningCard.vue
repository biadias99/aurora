<template>
  <v-row>
    <v-col class="text-h5 font-weight-bold">
      <v-card
        class="pt-5 pl-5 pb-5 lightBorder"
        cover
        elevation="0"
        image="../assets/background.png"
        min-height="10em"
        rounded="lg"
      >

        <v-row>
          <v-col>
            Welcome back, {{ user.firstName }}
          </v-col>
          <v-col class="text-right mr-4" md="4" sm="12">
            <v-btn color="purple" prepend-icon="mdi-plus" variant="outlined" @click="addActivity">
              Add activity
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <FormActivity
    :dialog="dialog"
    :is-editing="false"
    :record="record"
    @save="save"
    @update:dialog="dialog = $event"
  />

  <v-alert v-if="success" :closable="true" type="success">
    Activity created with success!
  </v-alert>
</template>

<script setup>
  import { ref, shallowRef } from 'vue'
  import { useActivityStore } from '@/stores/activities';
  import { dateToTimestamp } from '../composables/dateToTimestamp';
  import FormActivity from './FormActivity.vue';

  const activitiesStore = useActivityStore();
  const DEFAULT_RECORD = { name: '', done: false, date: '' }
  const record = ref(DEFAULT_RECORD);
  const dialog = shallowRef(false);
  const success = false;

  const user = {
    firstName: 'Bianca',
  }

  function addActivity () {
    dialog.value = true
  }

  async function save (localRecord) {
    await activitiesStore.createActivity({
      name: localRecord.name,
      done: false,
      date: dateToTimestamp(localRecord.date),
      created_at: dateToTimestamp(new Date()),
    });

    dialog.value = false
  }
</script>
