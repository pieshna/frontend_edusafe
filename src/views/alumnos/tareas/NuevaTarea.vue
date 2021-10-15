<template>
  <div class="container">
    <h1>Nueva Tarea</h1>
    <form @submit.prevent="envioDeTarea">
      <div class="card" v-for="datos in datosTarea" :key="datos.id">
        <div class="card-header">
          <h3>{{ datos.titulo }}</h3>
        </div>
        <div class="card-body">
          <h5 class="card-title">Vence: {{ datos.fechaExpiracion }}</h5>
          <p class="card-text">
            {{ datos.descripcion }}
          </p>
          <input type="file" class="selector" id="selector" @change="cambiodearchivo" />
          <br /><br />
          <div class="form-floating">
            <textarea
              class="form-control"
              v-model="datosEstudiante.comentario"
              placeholder="Escriba su comentario"
              id="floatingTextarea"
            ></textarea>
            <label for="floatingTextarea">Comentario</label>
          </div>
          <br />
          <input type="submit" class="btn btn-primary" value="Enviar" />
        </div>
      </div>
    </form>
    {{ datosTarea }}
    <p>archivo</p>
    {{ archivo }}
    <p>estudiante</p>
    {{ datosEstudiante }}
  </div>
</template>

<script>
import axios from "axios";

import { create } from "filepond";
import "filepond/dist/filepond.css";

export default {
  name: "NuevaTareaAlumno",
  props: {
    id: null,
  },
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      datosTarea: null,
      archivo: null,
      datosEstudiante: {
        fkAlumno: "",
        fkTarea: "",
        contenido: "",
        comentario: "",
        fechaEnvio: "",
      },
    };
  },
  methods: {
    async obtenerTarea() {
      await axios.get(this.host + "tarea/ver/" + this.id).then((response) => {
        this.datosTarea = response.data;
      });
      await axios.get(this.host + "alumno/" + this.$localStorage.get("teken")).then((response) => {
        this.datosEstudiante.fkAlumno = response.data[0].id;
      });
      this.datosEstudiante.fkTarea =this.id;
    },
    cambiodearchivo(event) {
      this.archivo = event.target.files[0];
    },
    async envioDeTarea() {
      let enviar = new FormData();
      enviar.append("archivo", this.archivo);
      await axios.post(this.host + "upload/", enviar).then((response) => {
        this.datosEstudiante.contenido = response.data.filename;
        this.datosEstudiante.fechaEnvio = this.fecha();
        axios.post(this.host + "envio/tarea/",this.datosEstudiante).then((res) => {
          console.log(res.data);
        });
      });
    },
    fecha() {
      let today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1; //Enero es 0!
      let yyyy = today.getFullYear();
      let hour = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      today = yyyy + "-" + mm + "-" + dd + " " + hour;
      return today;
    },
  },
  created() {
    this.obtenerTarea();
  },
};
</script>

<style></style>
