<template>
<div class="container">
  <h1 class="text-center">Nueva Tarea</h1>
  <br>
  <Tarea :grado=gradoId :materia=claseId />
</div>
</template>

<script>
import Tarea from "@/components/Tarea.vue"
export default {
nombre:"NuevaTarea",
props: {
    claseId:null,
    gradoId:null
},
components: {
Tarea
}
}
</script>

<style>

</style>