<template>
  <Tarea :grado=gradoId :materia=claseId />
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