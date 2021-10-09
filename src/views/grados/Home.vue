<template>
  <div class="container">
    <h1 class="text-center">Materias</h1>
    <br />
    <router-link to="/grados/nuevo">
    <a class="btn btn-primary">Nuevo</a>
    </router-link>
    <br>
    <br>
    <div class="row justify-content-between">
      <div class="col-md-3" v-for="materia in materias" :key="materia.id">
        <div class="card">
          <div class="card-body">
            <div class="card-title text-center">
              <h4>{{ materia.nombre }} <router-link :to=url+materia.id>
                <i class='bx bx-edit'></i></router-link> </h4>
              <ListarMaestroPorMateria :id="materia.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{ materias }} -->
  </div>
</template>

<script>
import axios from "axios";
import ListarMaestroPorMateria from "@/components/ListarMaestroPorMateria"
export default {
  name: "Materias",
  data() {
    return {
      materias: {},
      url:"/grados/edit/",
      host: process.env.VUE_APP_DB_HOST,
    };
  },
  methods: {
    async verMaterias() {
      await axios.get(this.host + "materia").then((res) => {
        this.materias = res.data;
      });
    },
  },
  created() {
    this.verMaterias();
  },
  components:{
    ListarMaestroPorMateria
  }
};
</script>

<style scoped>
a .bx-edit{
  color:rgb(58, 58, 58);
}
</style>
