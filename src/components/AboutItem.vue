<template>
  <v-card class="mx-auto" width="350" elevation="2">
    <v-card-title class="text-center headline">{{ title }}</v-card-title>
    <v-card-text>
      <div class="text-center">
        <v-icon size="64">{{ icon }}</v-icon>
      </div>
      <p class="text-center mt-2">{{ text }}</p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'AboutItem',
  props: {
    icon: String,
    title: String,
    text: String,
  },
};
</script>

<style scoped>
.headline {
  font-size: 20px; /* Adjust the font size as needed */
}

/* Adjust the card width, title size, and spacing here */
</style>

