<template>
  <v-card>
    <v-app-bar :elevation="0" rounded>
      <v-img
        alt="Logo Aurora"
        class="mx-2"
        contain
        max-height="80"
        max-width="80"
        src="../assets/logo_aurora.png"
      />
      <template #prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title class="text-h6" />
    </v-app-bar>
  </v-card>
</template>

<script setup>

</script>
