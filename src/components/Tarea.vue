<template>
  <div class="container">
    <h1>Tarea</h1>
    clase {{materia}}
    Grado {{grado}}
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormularioTarea",
  props: {
    grado: null,
    materia: null,
  },
  data() {
    return {
      host: process.env.VUE_APP_DB_HOST,
    };
  },
  methods: {
    async envio() {},
  },
};
</script>

<style></style>
