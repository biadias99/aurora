<template>
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
</template>

<script setup>
  const selectedColor = ref('blue');
  const attrs = ref([
    {
      key: 'test',
      highlight: true,
      dates: { start: new Date(2019, 3, 15), end: new Date(2019, 3, 19) },
    },
  ]);
</script>
