<template>
<div class="container">
  <h1>Editar Tarea</h1>
  <Tarea :tareaId=id />
</div>
</template>

<script>
import Tarea from "@/components/Tarea.vue"
export default {
nombre:"NuevaTarea",
props: {
    id:null,
},
components: {
Tarea
}
}
</script>

<style>

</style>