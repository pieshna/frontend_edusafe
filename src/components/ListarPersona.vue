<template>
  <div class="container">
    <h1 class="text-center">{{mensaje}}</h1>
    <br>
    <div class="row">
      <div class="col-md-3 py-2" v-for="usuario in usuarios" :key="usuario.id">
        <div class="card" style="width: 18rem;">
          <img :src=usuario.foto class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title" style="width: 15rem">{{usuario.nombre}} {{usuario.apellido}}</h5>
            
              <ul class="card-text">
                  <li> Usuario: {{usuario.usuario}} </li>
                  <li> Correo: {{usuario.correo}} </li>
                  <li> numero: {{usuario.numero}} </li>
                  <li v-if="usuario.rol==1 && mensaje=='Usuarios'"> Rol: Director </li>
                  <li v-if="usuario.rol==2 && mensaje=='Usuarios'"> Rol: Secretario (a) </li>
                  <li v-if="usuario.rol==3 && mensaje=='Usuarios'"> Rol: Docente </li>
                  <li v-if="usuario.rol==4 && mensaje=='Usuarios'"> Rol: Estudiante </li>
                  <li v-if="usuario.rol==5 && mensaje=='Usuarios'"> Rol: Encargado </li>
              </ul>
              <router-link :to="'/'+mensaje+'/edit/'+usuario.id">
              <button class="btn btn-block btn-primary">
                Editar
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name:"ListarPersona",
    props:{
        usuarios:null,
        mensaje: String
    }
}
</script>

<style scoped>
h1::first-letter{
  text-transform: uppercase;
}
</style>