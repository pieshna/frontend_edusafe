<template>
<NuevaPersona mensaje="Nuevo Estudiante" datosPersona=null rol=4 url="alumno" />
</template>

<script>
import NuevaPersona from "@/components/NuevaPersona.vue";
export default {
  name: "NuevoEstudiante",
  components: {
    NuevaPersona,
  },
};
</script>

<style></style>