<template>
<div class="list-group">
    <a v-if="datos.length<1" class="list-group-item list-group-item-action">No hay Docentes asociados</a>
    <a v-for="data in datos" :key=data.id class="list-group-item list-group-item-action">{{data.nombre}} {{data.apellido}}
      <router-link :to="url+data.id"><i class='bx bx-edit-alt'></i></router-link>
    </a>
</div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListarMaestroPorMateria",
  props: {
    id:null,
  },
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      datos: {},
      url:"/asignacion/editar/"
    };
  },
  methods: {
    async listar() {
      await axios.get(this.host + "maestro/materia/" + this.id).then((res) => {
        this.datos = res.data;
      });
    },
  },
  created() {
      this.listar()
  },
};
</script>

<style scoped>
.bx{
color:black;
}
</style>
