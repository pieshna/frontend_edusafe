<template>
  <div class="container">
    <h1>formulario</h1>
    <form @submit.prevent="guardarMateria">
      Nombre: <input type="text" v-model="datos.nombre" placeholder="Nombre de la materia" v-if="url!='carrera'" />
      <input type="text" v-model="datos.Nombre" placeholder="Nombre de la materia" v-if="url=='carrera'" />
      <br />
      <input type="submit" value="Guardar" class="btn btn-primary" />
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormularioGrado",
  props: {
    id: null,
    url:null
  },
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      datos: {},
    };
  },
  methods: {
    async guardarMateria() {
      if (this.id == null) {
        axios.post(this.host + this.url, this.datos).then((response) => {
          this.$router.push("/grados");
        });
      } else {
        axios.put(this.host + this.url+"/" + this.id, this.datos).then((response) => {
          this.$router.push("/grados");
        });
      }
    },
    async buscar(){
        await axios.get(this.host + this.url+"/"+this.id).then((response) => {
        this.datos=response.data[0]
        })
    }
  },
  created() {
      if(this.id!=null){
          this.buscar()
      }
  },
};
</script>

<style></style>
