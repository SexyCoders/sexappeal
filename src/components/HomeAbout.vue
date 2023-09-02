<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-container>
        <v-row justify="center" no-gutters>
          <v-col
            v-for="item in cardItems"
            :key="item.id"
            cols="12"
            sm="6"
            md="2"
          >
            <v-card class="ma-2 pa-2 card-hover">
              <v-img :src="item.image" height="200"></v-img>
              <v-card-title class="text-h6 text-center"><b>{{ item.title }}</b></v-card-title>
              <v-card-text class="text-center">{{ item.content }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>


<script>
export default {
  data() {
    return {
      cardItems: [
        {
          id: 1,
          title: "Ready For Anything",
          content: "Our docker based solutions ensure modularity and scalability to meet your needs.",
          image: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png"
        },
        {
          id: 2,
          title: "Modern and Powerful",
          content: "Using cutting edge technologies and modern frameworks for powerful and stable services.",
          image: "https://lib.sexycoders.org/share/logos/thirdparty/code.png"
        },
        {
          id: 3,
          title: "Cloud Based",
          content: "All our services are cloud based, making them accessible anytime, anywhere, and on any device.",
          image: "https://lib.sexycoders.org/share/logos/thirdparty/cloud-smile.png"
        },
        {
          id: 4,
          title: "Constantly Evolving",
          content: "Our coders commit tens of thousands of lines every month, making each service a little sexier.",
          image: "https://lib.sexycoders.org/share/logos/thirdparty/gear.png"
        }
      ]
    };
  }
};
</script>

<style>
.text-h6 {
  font-size: 1.25rem;
  margin-top: 12px;
  margin-bottom: 8px;
  font-weight: 500;
}

.card-hover:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  transform: translateY(-5px);
}
</style>
