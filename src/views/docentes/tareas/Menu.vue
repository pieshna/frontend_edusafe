<template>
  <div class="container">
    <h1 class="text-center">Tareas Actuales</h1>
    <h4>{{ claseNombre }} - {{ gradoNombre }}</h4>
    <router-link :to="'/tarea/nueva/' + clase + '/' + grado">
      <a class="btn btn-primary">Nueva Tarea</a>
    </router-link>
    <table class="table table-hover text-center" v-if="tareasActuales.length >0">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Titulo</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Fecha de expiracion</th>
                <th scope="col">Punteo</th>
                <th scope="col">Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="tarea in tareasActuales" :key="tarea.id">
                <td >{{contador++}}</td>
                <td >{{tarea.titulo}}</td>
                <td >{{tarea.descripcion}}</td>
                <td >{{this.formatear(tarea.fechaExpiracion)}}</td>
                <td >{{tarea.punteo}}</td>
                <td >
                    <router-link :to="'/tarea/editar/'+tarea.id">
                    <a class="btn btn-primary">Editar</a>
                    </router-link>
                </td>
            </tr>
        </tbody>
    </table>
    <div class="container" v-if="tareasActuales.length ==0">
        <br><br>
        <h2 class="text-center">Aun no se han creado tareas para este curso</h2>
    </div>
    <!-- {{ tareasActuales }} -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MenuTarea",
  props: {
    grado: null,
    clase: null,
  },
  data() {
    return {
        contador:1,
      tareasActuales: null,
      host: process.env.VUE_APP_DB_HOST,
      claseNombre: null,
      gradoNombre: null,
    };
  },
  methods: {
    async obtenerDatos() {
      const consulta1 = axios.get(this.host + "grado/" + this.grado);
      const consulta2 = axios.get(this.host + "materia/" + this.clase);
      const consulta3 = axios.get(this.host + "tarea/ver/" + this.clase + "/" + this.grado);

      axios.all([consulta1, consulta2, consulta3]).then(
        axios.spread((...responses) => {
          this.gradoNombre = responses[0].data[0].nombre;
          this.claseNombre = responses[1].data[0].nombre;
          this.tareasActuales = responses[2].data;
        })
      );
    },
    formatear(fecha){
        let formatear=fecha.split(" ")
        let fechaMes=formatear[0].split("-")
        let FechaFormateada=fechaMes[2]+"/"+fechaMes[1]+"/"+fechaMes[0]+" "+formatear[1].slice(0,-3)
        return FechaFormateada
        
    }
  },
  created() {
    this.obtenerDatos();
  },
};
</script>

<style></style>
