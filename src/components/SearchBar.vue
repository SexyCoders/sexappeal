<template>
  <v-text-field
    class="custom-search-bar"
    solo
    rounded
    hide-details
    label="Search"
    prepend-inner-icon="mdi-magnify"
  ></v-text-field>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'SearchBar'
});
</script>

<style scoped>
.custom-search-bar {
  height: 36px;
  border-radius: 18px !important;
  margin-top: auto;
  margin-bottom: auto;
}
.custom-search-bar label {
  font-size: 14px;
}
.custom-search-bar .v-input__icon {
  margin-top: 5px;
}
.custom-search-bar input {
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
}
.custom-search-bar .v-input__slot {
  border-bottom: none !important;
  height: 36px;
}
</style>

