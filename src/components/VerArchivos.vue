<template>
  <div class="container">
      <h1>archivo</h1>
    {{ datos }} <br>
<iframe :src="host+datos" frameborder="0"></iframe>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "VerAchivos",
  data() {
    return {
        host: process.env.VUE_APP_DB_HOST,
      datos: 'ver/archivo-1633322367623-Minuta_de_Trabajo6.pdf',
    };
  },
  methods:{
      async verArchivo(){
         
      }

  },
  created() {
this.verArchivo()
  }
};
</script>

<style scoped>
iframe{
width: 100%;
height: 80rem
}
</style>
