<template>
  <v-row>
    <v-col class="text-h6" cols="8">
      {{ formatted }}
    </v-col>
  </v-row>

</template>

<script setup>
  import { useDate } from 'vuetify'

  const date = useDate();

  const formatted = date.format(new Date(), 'fullDateWithWeekday');
</script>
