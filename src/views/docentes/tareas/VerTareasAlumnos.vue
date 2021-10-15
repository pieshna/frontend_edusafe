<template>
  <div class="container">
    <h1>Ver Tarea</h1>
    <!-- 
    {{tareasRecibidas.length}} {{index}} -->
    <button @click="subir" v-if="index + 1 < tareasRecibidas.length">next</button>
    <div class="container" v-if="tareasRecibidas[index] != null">
      <p>Entrega de: {{ tareasRecibidas[index].nombre }} {{ tareasRecibidas[index].apellido }}</p>
      <div class="row">
        <div class="col-md-9 py-3">
          <VerAchivos :url="tareasRecibidas[index].contenido" />
        </div>
        <div class="col-md-3 py-4">
          <div class="container">
            <div class="form-floating">
                <div class="text-center" v-if="tareaActual!=null">
                <p>Asignar nota:</p>
                <input type="text" v-model="punteoTarea.punteo" @keyup="validacion" v-if="punteoTarea!= null" disabled>
                <input type="text" v-model="punteo" @keyup="validacion"
                v-if="punteoTarea== null"> / {{tareaActual[0].punteo}}</div>
                <br>
                <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="comentario"
                v-model="punteoTarea.comentario"
                id="floatingTextarea"
                 style="height: 5rem"
                 v-if="punteoTarea!= null"
                 disabled
              ></textarea>
              <textarea
                class="form-control"
                placeholder="comentario"
                v-model="comentario"
                v-if="punteoTarea== null"
                id="floatingTextarea"
                 style="height: 5rem"
              ></textarea>
              <label for="floatingTextarea">Comentario de la entrega</label>
            </div>
                <br>
                <button class="btn btn-success" v-if="punteoTarea== null"  @click="guardar">Guardar</button>
            </div>
            <br>
            <div class="form-floating">
              <textarea
                class="form-control"
                placeholder="comentario"
                v-model="tareasRecibidas[index].comentario"
                id="floatingTextarea"
                 style="height: 15rem"
                disabled
              ></textarea>
              <label for="floatingTextarea">Comentario del estudiante</label>
            </div>
          </div>
        </div>
      </div>
      {{ tareasRecibidas }}
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VerAchivos from "@/components/VerArchivos";
export default {
  name: "VerTareasAlumnos",
  props: {
    id: null,
  },
  components: {
    VerAchivos,
  },
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
      tareasRecibidas: {
        nombre: "",
        apellido: "",
        contenido: "",
        comentario: "",
        fechaEnvio: "",
      },
      index: 0,
      tareaActual:null,
      comentario:"",
      punteo: "",
      puedeEnviarse:true,
      punteoTarea:null,
    };
  },
  methods: {
    async obtenerDatos() {
      await axios.get(this.host + "tareas/enviadas/" + this.id).then((res) => {
        this.tareasRecibidas = res.data;
      });
      await axios.get(this.host + "tarea/ver/"+this.id).then((res) => {
          this.tareaActual = res.data;
          if(this.index==0){
            
          this.consultarNota()
          }
           });
    },
    async guardar(){
        if(this.puedeEnviarse){
            const envio={
            fkTarea:this.tareasRecibidas[this.index].tareaId,
            punteo:this.punteo,
            comentario:this.comentario,
            
        }
        /* console.log(envio); */
        await axios.post(this.host + "asignar/nota",envio).then((res) => {
            this.$router.go(-1);
        })
        }else{
            console.log("cambie la nota");
        }
        
    },
    validacion() {
        if(this.punteo>this.tareaActual[0].punteo){
            document.querySelector('input[type="text"]').classList.add("inputerror")
            this.puedeEnviarse=false;
        }else{
            document.querySelector('input[type="text"]').classList.remove("inputerror")
            this.puedeEnviarse=true;
        }
        },
        async consultarNota(){
          await axios.get(this.host + "tarea/notaactual/"+this.tareasRecibidas[this.index].tareaId).then((res) => {
            this.punteoTarea=res.data[0]
          })
        },
        subir(){
          this.index++
          this.consultarNota()
        }
  },
  created() {
    this.obtenerDatos();
    
  },
};
</script>

<style scoped>
.row {
  background-color: rgb(94, 94, 94);
  border-radius: 1rem;
}
input[type=text] {
    width: 3rem;
}
.inputerror{
    background-color:red;
}
</style>
