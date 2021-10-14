<template>
  <div class="container">
      <h1>Tareas</h1>
      <div class="container">
          <div class="table table-hover">
              <thead>
                  <tr>
                      <th>Titulo</th>
                      <th>Descripcion</th>
                      <th>Fecha de expiracion</th>
                      <th>Punteo posible</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="tarea in tareasDisponibles" :key="tarea.id">
                      <td>{{tarea.titulo}}</td>
                      <td>{{tarea.descripcion}}</td>
                      <td>{{tarea.fechaExpiracion}}</td>
                      <td>{{tarea.punteo}} Pts.</td>
                      <td>
                      <router-link :to="'/nueva/tarea/'+tarea.id"><a><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"><path d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm-4 9h-3v3h-2v-3H8v-2h3V9h2v3h3v2z"></path></svg></a></router-link>
                      </td>
                  </tr>
              </tbody>
          </div>
      </div>
      {{tareasDisponibles}}
  </div>
</template>

<script>
import axios from "axios";
export default {
    name:"VerTareasAlumno",
    props:{
        id:null
    },
    data(){
        return{
            host: process.env.VUE_APP_DB_HOST,
            tareasDisponibles:null,
        }
    },
    methods:{
        async obtenerTareas(){
            await axios.get(this.host +"vertarea/"+this.id).then((res) =>{
                this.tareasDisponibles =res.data
            })
        }
    },
    created(){
        this.obtenerTareas()
    }

}
</script>

<style>

</style>