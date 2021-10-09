<template>
  <div class="container">
    <h1>Ver Clase</h1>
    <router-link :to="'/tarea/nueva/' + materiaId + '/' + gradoId">
      <a class="btn btn-primary">Nueva Tarea</a>
    </router-link>
    <div class="container">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Alumno</th>
            <th scope="col">Calificaciones</th>
            <th class="promedio" scope="col">Promedio</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="alumno in alumnos" :key="alumno.id">
            <td>{{ alumno.nombre }} {{ alumno.apellido }}</td>
            <td>tareax</td>
            <td class="promedio">x</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "VerClase",
  props: {
    gradoId: null,
    materiaId: null,
  },
  data() {
    return {
      alumnos: null,
      host: process.env.VUE_APP_DB_HOST,
    };
  },
  methods: {
    async obtenerDatos() {
      await axios.get(this.host + "alumno/grado/" + this.gradoId).then((response) => {
        this.alumnos = response.data;
      });
    },
  },
  created() {
    this.obtenerDatos();
  },
};
</script>

<style scoped>
.promedio {
  max-width: 3rem;
  text-align: center;
}
</style>
