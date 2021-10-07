<template>
<NuevaPersona mensaje="Nuevo Docente" datosPersona=null rol=3 url="maestro" />
</template>

<script>
import axios from "axios";
import NuevaPersona from "@/components/NuevaPersona.vue";
export default {
  name: "NuevoDocente",
  components: {
    NuevaPersona,
  },
};
</script>

<style></style>
