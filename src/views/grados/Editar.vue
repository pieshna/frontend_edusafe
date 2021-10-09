<template>
<FormularioGrado url="materia" :id=id />
</template>

<script>
import FormularioGrado from "@/components/FormularioGrado"
export default {
  name: "EditarMateria",
  props:{
      id:null
  },
  data() {
    return {};
  },
  methods: {},
  components: {
      FormularioGrado
  }
};
</script>

<style></style>