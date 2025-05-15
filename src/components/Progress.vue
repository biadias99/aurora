<template>
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
</template>

<script setup>
  const activities = [];
</script>
