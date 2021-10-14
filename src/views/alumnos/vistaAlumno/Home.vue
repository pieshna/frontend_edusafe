<template>
  <div class="container">
    <hr />
    <h3 class="text-center">Materias:</h3>
    <hr />
    <br />
    <h4>{{ grado.nombre }} - {{ grado.ciclo }}</h4>
    <br />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-3" v-for="materia in materias" :key="materia.id">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">{{ materia.nombre }}</h5>
              <hr />
              <p class="card-text">
                Impartida por:
              </p>
              <p class="card-text">
                {{ materia.docenteNombre }} {{ materia.docenteApellido }}
              </p>

              <a href="#" class="btn btn-primary">Ver Clase</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <p>datos</p>
    {{ datos }}
    <p>grado</p>
    {{ grado }}
    <p>materias</p>
    {{ materias }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeAlumno",
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      datos: null,
      estudiante: null,
      grado: {
        nombre: "",
        ciclo: "",
      },
      materias: null,
    };
  },
  methods: {
    async obtener() {
      await axios
        .get(this.host + "grado/estudiante/" + this.$localStorage.get("teken"))
        .then((res) => {
          this.estudiante = res.data[0];
          axios.get(this.host + "grado/" + this.estudiante.grado_id).then((res) => {
            this.grado = res.data[0];
          });
        });
      await axios.get(this.host + "materia/grado/" + this.estudiante.grado_id).then((res) => {
        this.materias = res.data;
      });
    },
  },
  created() {
    this.obtener();
  },
};
</script>

<style scoped>
</style>
