<template>
<FormularioGrado url="carrera" :id=id />
</template>

<script>
import FormularioGrado from "@/components/FormularioGrado"
export default {
  name: "EditarCarrera",
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