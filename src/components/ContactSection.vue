<template>
  <v-container fluid>
    <v-row class="justify-center align-center">
      <v-col cols="4">
        <v-card class="d-flex flex-column pane-container">
          <v-card-text class="text-left">
            <v-icon v-if="showForm" @click="showForm = !showForm" class="ma-2">mdi-arrow-left</v-icon>
          </v-card-text>
          <!-- Info Pane -->
          <v-card-text class="text-center flex-grow-1" v-if="!showForm">
            <h2>Contact Information</h2>
            <v-row class="fill-height">
              <!-- First Column: Company Info -->
              <v-col cols="6" class="d-flex flex-column justify-center">
                <div class="contact-info-item">
                  <v-icon>mdi-phone</v-icon> Phone: +1 123 456 7890
                </div>
                <div class="contact-info-item">
                  <v-icon>mdi-map-marker</v-icon> Location: 123 Main St, City, Country
                </div>
                <div class="contact-info-item">
                  <v-icon>mdi-email</v-icon> Email: info@company.com
                </div>
                <div class="contact-info-item">
                  <v-icon>mdi-web</v-icon> <a href="https://support.sexycoders.org">Documentation</a>
                </div>
              </v-col>
              <!-- Second Column: Leaflet Map -->
              <v-col cols="6" class="d-flex align-stretch">
                <div id="leafletMap" class="flex-grow-1"></div>
              </v-col>
            </v-row>
            <v-btn block color="blue" @click="showForm = !showForm" class="mt-auto">
              Send Message
            </v-btn>
          </v-card-text>
          <!-- Contact Form -->
          <v-card-text class="text-center flex-grow-1" v-else>
            <Form @submit="handleSubmit" :validation-schema="schema">
              <Field name="name" v-slot="{ field, meta }">
                <v-text-field
                  v-bind="field"
                  label="Your Name"
                  :error-messages="meta.errors"
                  variant="outlined"
                  prepend-inner-icon="mdi-account-outline"
                  density="compact"
                />
              </Field>
              <Field name="email" v-slot="{ field, meta }">
                <v-text-field
                  v-bind="field"
                  label="Your Email"
                  :error-messages="meta.errors"
                  variant="outlined"
                  prepend-inner-icon="mdi-email-outline"
                  density="compact"
                />
              </Field>
              <Field name="subject" v-slot="{ field, meta }">
                <v-text-field
                  v-bind="field"
                  label="Subject"
                  :error-messages="meta.errors"
                  variant="outlined"
                  prepend-inner-icon="mdi-subject"
                  density="compact"
                />
              </Field>
              <Field name="message" v-slot="{ field, meta }">
                <v-textarea
                  v-bind="field"
                  label="Message"
                  :error-messages="meta.errors"
                  variant="outlined"
                  prepend-inner-icon="mdi-message-outline"
                  density="compact"
                />
              </Field>
              <v-btn block color="blue" size="large" type="submit">
                Submit
              </v-btn>
            </Form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as yup from 'yup';
import { Form, Field } from 'vee-validate';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const showForm = ref(false);  // Set to false to show info pane by default

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

const handleSubmit = async () => {
  // Your form submission logic here
};

onMounted(() => {
  const map = L.map('leafletMap').setView([40.7128, -74.0060], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  L.marker([40.7128, -74.0060]).addTo(map);
});
</script>

<style scoped>
.pane-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.contact-info-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.fill-height {
  height: 100%;
}

#leafletMap {
  height: 100%;
}
</style>

