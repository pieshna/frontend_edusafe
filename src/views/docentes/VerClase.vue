<template>
  <div class="container">
    <h1>Ver Clase</h1>
    <router-link :to="'/tarea/ver/' + materiaId + '/' + gradoId">
      <a class="btn btn-primary">Ver Tarea</a>
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
            <td class="calificacion" v-if="tarea.length>0">
              <p v-for="datos in tarea" :key="datos.id">-/{{ datos.punteo }}</p>
            </td>
            <td v-if="tarea.length<1">Aun no hay tareas</td>
            <td class="promedio total">{{ this.promedio() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 
    <h1>tarea</h1>
    {{tarea}} -->
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
      tarea: [],
      host: process.env.VUE_APP_DB_HOST,
    };
  },
  methods: {
    async obtenerDatos() {
      await axios.get(this.host + "alumno/grado/" + this.gradoId).then((response) => {
        this.alumnos = response.data;
      });
      await axios
        .get(this.host + "tarea/ver/" + this.materiaId + "/" + this.gradoId)
        .then((response) => {
          this.tarea = response.data;
        });
    },
    promedio() {
      let sumaDeTotales = 0;
      let sumaDeAlumno=0
      if(this.tarea==null){
        return
      }
      if (this.tarea.length == 0) {
        return "0/0";
      }
      for (let i = 0; i < this.tarea.length; i++) {
        sumaDeTotales += this.tarea[i].punteo;
      }
      let promedioTotal = sumaDeTotales / this.tarea.length;
      if (sumaDeAlumno / promedioTotal >= 0.6) {
      }else if(sumaDeAlumno/promedioTotal < 0.6){
        document.querySelector(".total").classList.add("rojo")
      }
      return `${sumaDeAlumno}/${promedioTotal}`;
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
.calificacion {
  display: flex;
}
.calificacion p {
  margin-left: 20px;
}
.rojo{
  color:red
}
</style>
