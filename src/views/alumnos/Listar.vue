<template>
  <ListarPersona :usuarios=this.usuarios mensaje="Estudiantes" />
</template>
<script>
import axios from "axios";
import ListarPersona from '@/components/ListarPersona.vue'
export default {
  name: "ListarEstudiante",
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      usuarios: [],
    };
  },
  created() {
    this.consultarUsuario();
  },
  methods: {
    async consultarUsuario() {
      await axios
        .get(`${this.host}/usuario/rol/4`)
        .then((respuesta) => {
          this.usuarios = respuesta.data;
          //console.log(this.usuarios);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components:{
      ListarPersona
  }
};
</script>