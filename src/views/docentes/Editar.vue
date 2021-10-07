<template>
<NuevaPersona mensaje="Editar Docente" :urlEdit=url />
</template>

<script>
import NuevaPersona from "@/components/NuevaPersona"
export default {
  props: ["id"],
  name: "EditarDocente",
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