<template>
<NuevaPersona mensaje="Editar Estudiante" :urlEdit=url />
</template>

<script>
import axios from "axios";
import NuevaPersona from "@/components/NuevaPersona"
export default {
  props: ["id"],
  name: "EditarEstudiante",
  components: {NuevaPersona},
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      url: null,
      hotImage: {
        urlImagen: null,
        imagen: null,
      },
    };
  },
  created() {
    this.consultarPersona();
  },
  methods: {
    async consultarPersona() {
      this.url=`${this.host}usuario/${this.id}`
    },
  },
};
</script>
<style scoped>
</style>