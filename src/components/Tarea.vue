<template>
  <div class="container">
    <!-- <h1>Tarea</h1> -->
    <form @submit.prevent="envio">
      <div class="row">
        <div class="col-md-5">
          <p>Titulo</p>
          <input type="text" v-model="datos.titulo" placeholder="Ingrese el titulo" required />
        </div>
        <div class="col-md-4">
          <p>Fecha de expiracion</p>
          <input type="date" v-model="fecha" placeholder="" required /> :
          <input type="time" v-model="hora" placeholder="" required />
        </div>
      </div>
      <div class="row">
        <div class="col-md-5">
          <p>Instrucciones</p>
          <textarea v-model="datos.descripcion" cols="30" rows="1"></textarea>
        </div>
        <div class="col-md-4">
          <p>Punteo maximo</p>
          <input type="number" v-model="datos.punteo" />
        </div>
      </div>
      <input type="submit" value="Guardar" />
    </form>
    <!-- {{ datos }} -->

    <!-- clase {{ materia }} Grado {{ grado }} -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormularioTarea",
  props: {
    tareaId: null,
    grado: null,
    materia: null,
  },
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      datos: {
        fkMateria: "",
        fkGrado: "",
        fechaExpiracion: "",
        titulo: "",
        descripcion: "",
        punteo: "",
      },
      fecha: "",
      hora: "",
    };
  },
  methods: {
    async envio() {
      this.datos.fechaExpiracion = this.fecha + " " + this.hora + ":00";
      console.log(this.datos);
      if (this.tareaId == null) {
        this.datos.fkMateria = this.materia;
        this.datos.fkGrado = this.grado;
        await axios.post(this.host + "tarea/nueva", this.datos).then((response) => {});
      }else{
        axios.put(this.host+"tarea/editar/"+this.tareaId,this.datos).then((response) => {
          this.$router.push("/tarea/ver/"+this.datos.fkMateria+"/"+this.datos.fkGrado)
        });
         
      }
    },
    async buscarTarea() {
      await axios.get(this.host + "tarea/ver/" + this.tareaId).then((response) => {
        this.datos = response.data[0];
        let fechayhora = response.data[0].fechaExpiracion.split(" ");
        this.fecha = fechayhora[0];
        this.hora = fechayhora[1].slice(0, -3);
      });
    },
  },
  created() {
    if (this.tareaId != null) {
      this.buscarTarea();
    }
  },
};
</script>

<style></style>
