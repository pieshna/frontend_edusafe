<template>
<ListarPersona :usuarios=this.usuarios mensaje="Usuarios" />
  
</template>
<script>
import axios from "axios";
import ListarPersona from '@/components/ListarPersona.vue'
export default {
  name: "ListarUsuario",
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
        .get(`${this.host}/usuario`)
        .then((respuesta) => {
          this.usuarios = respuesta.data;
          //console.log(this.usuarios);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    ListarPersona
  }
};
</script>
