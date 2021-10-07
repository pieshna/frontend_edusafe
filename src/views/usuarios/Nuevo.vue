<template>
<NuevaPersona mensaje="Nuevo Usuario" datosPersona=null url="usuario" />
</template>

<script>
import axios from "axios";
import NuevaPersona from "@/components/NuevaPersona.vue";
export default {
  name: "NuevoUsuario",
  components: {
    NuevaPersona,
  },
};
</script>

<style></style>
