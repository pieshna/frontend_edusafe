<template>
  <div class="container py-2">
    <h4>{{url}}</h4>
    <iframe :src="host+ 'ver/'+ url" frameborder="0"></iframe>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "VerAchivos",
  props: {
    url: null,
  },
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      datos: "ver/archivo-1633322367623-Minuta_de_Trabajo6.pdf",
    };
  },
  methods: {
    async verArchivo() {},
  },
  created() {
    this.verArchivo();
  },
};
</script>

<style scoped>
iframe {
  width: 100%;
  height: 70rem;
}
.container{
  background-color: rgb(180, 180, 180);
  border-radius: 1rem;
  
}
</style>
