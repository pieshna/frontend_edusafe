<template>
  <div class="container">
      <h1>Tareas</h1>
  </div>
</template>

<script>
export default {
    name:"VerTareasAlumno",
    props:{

    },
    data(){
        return{
            host: process.env.VUE_APP_DB_HOST,
        }
    },
    methods:{
    
    },
    created(){
    }

}
</script>

<style>

</style>