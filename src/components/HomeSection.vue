<template>
  <v-container id="home" fluid class="fullscreen-container">
    <video autoplay loop muted class="fullscreen-video">
      <source src="https://lib.sexycoders.org/share/logos/live/SexyCodersBanner.mp4" type="video/mp4">
    </video>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HomeSection',
  data: () => ({
  }),
});
</script>

<style scoped>
.fullscreen-container {
  padding: 0 !important;
  margin: 0 !important;
  position: relative;
  width: 100%;
  height: 100vh;  /* Full viewport height */
}

.fullscreen-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;  /* Cover the entire screen without stretching */
  z-index: 1;
}
</style>

