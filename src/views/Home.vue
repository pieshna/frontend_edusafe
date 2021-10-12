<template>
  <div>
    <div class="container" v-if="this.$localStorage.get('salt') < 3">
      <h1 class="text-center">Bienvenido</h1>
      <br /><br />
      <div class="row justify-content-between">
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-center">Alumnos #{{ totalAlumnos }}</h4>
              <!-- <div class="card-text text-center">
              <p class="negrita">Actualmente: </p>
            </div> -->
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-center">Docentes #{{ totalDocentes }}</h4>
              <!-- <div class="card-text text-center">
              <p class="negrita">Actualmente: </p>
            </div> -->
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-center">Secretario (a) #{{ totalSecretario }}</h4>
              <!-- <div class="card-text text-center">
              <p class="negrita">Actualmente: </p>
            </div> -->
            </div>
          </div>
        </div>
      </div>
      <br /><br />
      <div class="row justify-content-between">
        <h4 class="text-center">Carreras</h4>
        <div class="col-md-3" v-for="carrera in carrerasActuales" :key="carrera.id">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-center">
                {{ carrera.Nombre }}
              </h4>
              <ListaGradosHome :id="carrera.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-if="this.$localStorage.get('salt') == 3">
      <h1 class="text-center">Materias</h1>
      <br />
      <div class="row justify-content-between">
        <div class="col-md-3 py-2" v-for="materias in materiasDeDocente" :key="materias.id">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title text-center">{{ materias.nombre }}</h4>
              <div class="list-group">
                <a class="list-group-item list-group-item-action" v-for="grado in materias.gradosDelDocente" :key="grado.id">{{ grado.nombre }}
                  <router-link :to="'/clase/ver/'+grado.id+'/'+grado.materiaPerteneciente"><i class='bx bx-show'></i></router-link>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- {{materiasDeDocente}} -->
  </div>
</template>

<script>
import axios from "axios";
import ListaGradosHome from "@/components/ListaGradosHome";

export default {
  name: "Home",
  components: {
    ListaGradosHome,
  },
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      totalAlumnos: 0,
      totalDocentes: 0,
      totalSecretario: 0,
      carrerasActuales: {},
      //Docente dashboard
      materiasDeDocente: [],
    };
  },
  methods: {
    async obtenerDatos() {
      try {
        const consulta1 = axios.get(this.host + "alumno/contador");
        const consulta2 = axios.get(this.host + "maestro/contador");
        const consulta3 = axios.get(this.host + "secretario/contador");
        const consulta4 = axios.get(this.host + "carrera");
        axios
          .all([consulta1, consulta2, consulta3, consulta4])
          .then(
            axios.spread((...responses) => {
              this.totalAlumnos = responses[0].data[0].Actuales;
              this.totalDocentes = responses[1].data[0].Actuales;
              this.totalSecretario = responses[2].data[0].Actuales;
              //console.log(responses[3].data);
              this.carrerasActuales = responses[3].data;
            })
          )
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async dashboardMaestro() {
      const consulta1 = axios.get(
        this.host + "maestro/vermateria/" + this.$localStorage.get("teken")
      );
      const consulta2 = axios.get(
        this.host + "maestro/gradosasignados/" + this.$localStorage.get("teken")
      );
      axios.all([consulta1, consulta2]).then(
        axios.spread((...responses) => {
          for (let materia = 0; materia < responses[0].data.length; materia++) {
            let nombreMateria = responses[0].data[materia].nombre;
            let gradoMateria=[]
            for (let grado = 0; grado < responses[1].data.length; grado++) {
              if (responses[1].data[grado].materiaPerteneciente == materia + 1){
                gradoMateria.push(responses[1].data[grado])
              }
            }
          this.materiasDeDocente.push({
            nombre: nombreMateria,
            gradosDelDocente:gradoMateria,
          });
          }
        })
      )
    },
  },
  created() {
    if (this.$localStorage.get("salt") < 3) {
      this.obtenerDatos();
    } else if (this.$localStorage.get("salt") == 3) {
      this.dashboardMaestro();
    }
  },
};
</script>
<style scoped>
.negrita {
  font-weight: bold;
}
</style>
