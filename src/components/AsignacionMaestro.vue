<template>
  <div class="container">
      <h1>Asignacion de Docentes</h1> 
      <form @submit.prevent="enviar">
          <div class="row">
          <div class="col-md-4">
              <p>Docente:</p>
              <select v-model="asignarDocente.fkUsuario">
                  <option value="" disabled>Seleccione un Docente</option>
                  <option v-for="maestro in maestros" :key="maestro.id" :value="maestro.id">{{maestro.nombre}} {{maestro.apellido}}</option>
              </select>
          </div>
          <div class="col-md-4">
              <p>Materias:</p>
              <select v-model="asignarDocente.fkMateria">
                  <option value="" disabled>Seleccione la materia</option>
                  <option v-for="materia in materias" :key="materia.id" :value="materia.id">{{materia.nombre}}</option>
              </select>
          </div>
          <div class="col-md-4">
              <p>Grados:</p>
              <select v-model="asignarDocente.fkGrado">
                  <option value="" disabled>Seleccione un Grado</option>
                  <option v-for="grado in grados" :key="grado.id" :value="grado.id">{{grado.nombre}}</option>
              </select>
          </div></div>
          <br>
          <input type="submit" value="Guardar" class="btn btn-primary">
      </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
name:"AsignacionMaestro",
props:{
    id:null,
},
data() {
    return{
        host: process.env.VUE_APP_DB_HOST,
        maestros:{},
        materias:{},
        grados:{},
        asignarDocente:{
            fkUsuario:'',
            fkMateria:'',
            fkGrado:'',
        }
    }
},
methods: {
    async buscar(){
        try {
            
            const consulta1=axios.get(this.host+"usuario/rol/3")
            const consulta2=axios.get(this.host+"materia")
            const consulta3=axios.get(this.host+"grado")
            axios.all([consulta1, consulta2,consulta3]).then(axios.spread((...responses)=>{
                this.maestros=responses[0].data
                this.materias=responses[1].data
                this.grados=responses[2].data
            }))
            if(this.id!=null){
                await axios.get(this.host +"maestro/asignacion/"+this.id).then((response)=>{
                this.asignarDocente=response.data[0]
            })
            }
            
        } catch (error) {
            console.log(error);
        }
    },
    async enviar(){
        if(this.id==null){
            await axios.post(this.host +"maestro",this.asignarDocente).then((response)=>{
                this.$router.push('/grados')
            })
        }else{
            await axios.put(this.host +'maestro/asignacion/'+this.id,this.asignarDocente).then((response)=>{
                this.$router.push('/grados')

            })
        }
    }

},
created(){
    this.buscar()
}
}
</script>

<style>

</style>