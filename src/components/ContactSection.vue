<template>
  <v-container id="contact" fluid>
    <v-row class="justify-center align-center">
      <v-col cols="6">
        <v-card class="d-flex flex-column pane-container fixed-height">
            <v-icon v-if="showForm" class="ma-2 pl-2" @click="handleBackClick">mdi-arrow-left</v-icon>
            <h2 v-else class="d-flex justify-center">Contact Us</h2>
          <!-- Info Pane -->
          <v-card-text class="text-center flex-grow-1 fixed-height" v-if="!showForm">
            <!--<v-row class="fill-height">-->
            <v-row style="height:97%">
              <!-- First Column: Company Info -->
                        <v-col cols="6" class="d-flex flex-column justify-center align-center justify-space-between custom-col">
                <div>
                  <a class="text-left">
                  <v-icon>mdi-email</v-icon> team@sexycoders.org
                  </a>
                </div>
                <div>
                  <a class='text-left'>
                  <v-icon>mdi-phone</v-icon>
                    (+30) 6944968225 (10:00 - 14:00 EET)</a><br>
                </div>
                <div>
                  <a class='text-left'>
                  <v-icon>mdi-whatsapp</v-icon>
                    WhatsUp (10:00 - 14:00 EET)</a><br>
                </div>
                <div>
                  <v-icon>mdi-handshake-outline</v-icon>
                  <a href="https://mm.sexycoders.org" target="_blanc" class="text-left styled-link">
                    Join Our Community</a>
                </div>
                <div>
                  <a class="text-left">
                  <v-icon>mdi-mailbox-outline</v-icon>
                  Lytchett House 13 Freeland Park, Wareham Road, BH16 6FA, Poole, United Kingdom
                  </a>
                </div>
            <div class="button-row">
              <v-btn color="blue" @click="showForm = !showForm" class="button-item">
                Send Message
              </v-btn>
              <v-btn color="green" class="button-item">
                <a @click="redirectToNewTab('https://support.sexycoders.org')">Get Started</a>
              </v-btn>
            </div>
              </v-col>
              <!-- Second Column: Leaflet Map -->
              <v-col cols="6" class="d-flex align-stretch">
                <div id="leafletMap" class="flex-grow-1"></div>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- Contact Form -->
          <v-card-text class="text-center flex-grow-1 fixed-height" v-else>
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
                  prepend-inner-icon="mdi-email-edit-outline"
                  density="compact"
                />
              </Field>
              <Field name="message" v-slot="{ field, meta }">
                <v-textarea
                  v-bind="field"
                  label="Message"
                  :error-messages="meta.errors"
                  variant="outlined"
                  prepend-inner-icon="mdi-text-box-outline"
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
import axios from 'axios';
import { ref, onMounted, nextTick } from 'vue';
import * as yup from 'yup';
import { Form, Field } from 'vee-validate';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

let map;
const showForm = ref(false);

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

const handleSubmit = async (values) => {
  console.log(values);
  try {
    // Convert values to a JSON string
    const jsonString = JSON.stringify(values);
    console.log(jsonString);

    // Encode the JSON string in base64
    const base64EncodedData = btoa(jsonString);

    const response = await axios({
      method: 'post',
      url: 'http://localhost:3001/app/contact_form',
      data: base64EncodedData,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.data.status === 'success') {
      console.log('Email sent successfully');
      showForm.value = false;
    } else {
      console.error('Error sending email:', response.data.message);
    }
  } catch (error) {
    console.error('An error occurred while sending the email:', error);
  }
};


const handleBackClick = () => {
  showForm.value = false;
  if (map) {
    map.remove();
    map = null;
  }
  nextTick(() => {
    initMap();
  });
};

const icon = L.icon({
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const initMap = () => {
  if (!map) {
    map = L.map('leafletMap').setView([50.75864930601419, -2.0748479677224383], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Maps by OpenStreetMap'
    }).addTo(map);
    L.marker([50.75865604477328, -2.074973544393281],{ icon: icon }).addTo(map);
  } else {
    map.invalidateSize();
  }
};

const redirectToNewTab = (url) => {
  window.open(url, '_blank');
};

onMounted(() => {
  initMap();
});

</script>

<style scoped>

.button-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-left: 10%;  /* Left padding */
  padding-right: 10%;  /* Right padding */
}


.fill-height {
  height: 100%;
}

#leafletMap {
  height: 100%;
}

.fixed-height {
  height: 470px;
  overflow: auto;
}

.custom-col {
  padding-top: 1%;  /* Adjust as needed */
  padding-bottom: 1%;  /* Adjust as needed */
}

  .styled-link {
    text-decoration: none;
    color: inherit;
    padding: 0 8px;
    position: relative;
  }

  .styled-link:hover {
    text-decoration: none;
  }

  .styled-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--v-secondary-base);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

</style>

