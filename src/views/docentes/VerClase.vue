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
            <td class="calificacion" v-if="tarea.length > 0">
              <div class=" d-flex align-items-stretch separar" v-for="datos in tarea" :key="datos.id">
                <div v-for="nota in notasDeClase" :key="nota.id">
                  <div v-if="alumno.estudianteId==nota.fkAlumno">
                  <p v-if="nota.tareaId==datos.id">
                    {{ nota.punteo }}
                  </p></div>
                </div>
                <p>/{{ datos.punteo }}</p>
              </div>
            </td>
            <td v-if="tarea.length < 1">Aun no hay tareas</td>
            <td class="text-center" :id="alumno.estudianteId">{{ this.promedio(alumno.estudianteId) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- {{ alumnos }}
    <h1>tarea</h1>
    {{ tarea }}
    <p>Notas de clase</p>
    {{ notasDeClase }} -->
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
      notasDeClase: [],
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
      await axios
        .get(this.host + "tarea/nota/" + this.materiaId + "/" + this.gradoId)
        .then((response) => {
          this.notasDeClase = response.data;
        });
    },
    promedio(id) {
      let sumaDeTotales = 0;
      let sumaDeAlumno = 0;
      for (let index = 0; index < this.notasDeClase.length; index++) {
        if(id==this.notasDeClase[index].fkAlumno){
          sumaDeAlumno+=this.notasDeClase[index].punteo
        }
      }
      if (this.tarea == null) {
        return;
      }
      if (this.tarea.length == 0) {
        return "0/0";
      }
      for (let i = 0; i < this.tarea.length; i++) {
        sumaDeTotales += this.tarea[i].punteo;
      }
      let promedioAlumno=sumaDeAlumno/this.tarea.length;
      let promedioTotal = sumaDeTotales / this.tarea.length;
        //console.log("promedio "+(promedioAlumno / promedioTotal));
      if ((promedioAlumno / promedioTotal) < 0.6) {
        document.getElementById(`${id}`).classList.add("rojo");
      }else{
        document.getElementById(`${id}`).classList.remove("rojo");

      }
      return `${promedioAlumno.toFixed(2)}/${promedioTotal.toFixed(2)}`;
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
.calificacion .separar{
  margin-left: 20px;
}
.rojo {
  color: red;
}
</style>
