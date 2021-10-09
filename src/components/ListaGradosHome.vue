<template>
  <div class="list-group">
    <a v-if="datos.length<1" class="list-group-item list-group-item-action">No hay Grados asignados</a>
      <router-link to="/">
    <a v-for="grado in datos" :key="grado.id" class="list-group-item list-group-item-action">
{{grado.nombre}} - {{grado.contador}}
  </a></router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ListaGradosHome",
  props: {
    id: null,
  },
  data() {
    return {
      datos: [],
      host: process.env.VUE_APP_DB_HOST,
    };
  },
  methods: {
    async obtener() {
      let grados = await axios.get(this.host + "grado/carrera/" + this.id).then((res) => {
        return res.data;
      });
      let contador = await axios
        .get(this.host + "grado/contar/estudiante/" + this.id)
        .then((res) => {
          return res.data;
        });
      for (let i = 0; i < grados.length; i++) {
        for (let j = 0; j < contador.length; j++) {
          if (grados[i].id == contador[j].idGrado) {
            this.datos.push({ nombre: grados[i].nombre, contador: contador[j].contador });
          }
        }
      }
      if(grados.length>contador.length){
          for (let x = this.datos.length; x < grados.length; x++) {
              this.datos.push({ nombre: grados[x].nombre, contador: 0 });
              
          }
      }
    },
  },
  created() {
    this.obtener();
  },
};
</script>

<style scoped>
a{
    text-decoration: none;
}
</style>
