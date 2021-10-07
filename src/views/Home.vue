<template>
  <div class="container">
  <h1 class="text-center">Bienvenido</h1>
  <br><br>
    <div class="row justify-content-between">
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-center">Alumnos #{{totalAlumnos}}</h4>
            <!-- <div class="card-text text-center">
              <p class="negrita">Actualmente: </p>
            </div> -->
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-center">Docentes #{{totalDocentes}}</h4>
            <!-- <div class="card-text text-center">
              <p class="negrita">Actualmente: </p>
            </div> -->
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-center">Secretario (a) #{{totalSecretario}}</h4>
            <!-- <div class="card-text text-center">
              <p class="negrita">Actualmente: </p>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      totalAlumnos: 0,
      totalDocentes: 0,
      totalSecretario: 0,
    };
  },
  methods: {
    async obtenerDatos() {
      try {
        const consulta1=axios.get(this.host+"alumno/contador")
        const consulta2=axios.get(this.host+"maestro/contador")
        const consulta3=axios.get(this.host+"secretario/contador")
        axios.all([consulta1, consulta2,consulta3]).then(axios.spread((...responses)=>{
          
        this.totalAlumnos=responses[0].data[0].Actuales
        this.totalDocentes=responses[1].data[0].Actuales
        this.totalSecretario=responses[2].data[0].Actuales
        })).catch(error =>{
          console.log(error);
        })
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.obtenerDatos()
  },
};
</script>
<style scoped>
.negrita{
  font-weight: bold;
}
</style>
