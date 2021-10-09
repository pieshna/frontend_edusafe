<template>
  <div class="container">
    <h1 class="text-center">Menu</h1>
    <br />
    <div class="row justify-content-between">
      <div class="col-md-3 text-center">
        <h4>Carreras</h4>
        <router-link to="/carreras/menu">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 24 24"
              style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
            >
              <path
                d="M3 8v11c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19c0-.101.009-.191.024-.273.112-.576.584-.717.988-.727H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v3zm3-4h13v12H5V5c0-.806.55-.988 1-1z"
              ></path>
              <path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path>
            </svg>
          </a>
        </router-link>
      </div>
      <div class="col-md-3 text-center">
        <h4>Asignacion de docente</h4>
        <router-link to="/asignacion/menu">
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="96"
              height="96"
              viewBox="0 0 24 24"
              style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
            >
              <path
                d="M3 8v11c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.806 5 19c0-.101.009-.191.024-.273.112-.576.584-.717.988-.727H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v3zm3-4h13v12H5V5c0-.806.55-.988 1-1z"
              ></path>
              <path d="M11 14h2v-3h3V9h-3V6h-2v3H8v2h3z"></path>
            </svg>
          </a>
        </router-link>
      </div>
      <div class="col-md-3 text-center">
        <h4>Materias</h4>
        <router-link to="/grados/menu">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20 12v6a1 1 0 0 1-2 0V4a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-6h-2zm-6-1v2H6v-2h8zM6 9V7h8v2H6zm8 6v2h-3v-2h3z"></path></svg>
          </a>
        </router-link>
      </div>
    </div>
<br><br><br>
<div class="container">
    <p>Carreras actuales</p>
    <div class="col-md-3">
    <ul class="list-group">
        <li class="list-group-item" v-for="data in datos" :key="data.id">{{data.Nombre}}
            <router-link :to="urlCarrera+data.id">
                <i class='bx bx-edit-alt' ></i>
            </router-link>
        </li>
    </ul></div>
</div>

<!-- {{datos}} -->


  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Dashboard",
  data() {
      return{
          host: process.env.VUE_APP_DB_HOST,
          datos:{},
          urlCarrera:"/carreras/editar/"
      }
  },
  methods: {
      async llenar(){
          await axios.get(this.host + "carrera").then((response)=>{
              this.datos=response.data
          })
      }
  },
  created() {
      this.llenar()
  }
};
</script>

<style scoped></style>
