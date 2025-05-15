<template>
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
</template>

<script setup>
  const user = {
    firstName: 'Bianca',
  }
</script>
