<template>
  <AsignacionMaestro :id=id />
</template>

<script>
import AsignacionMaestro from "@/components/AsignacionMaestro"
export default {
name:"EditarAsignacion",
props: {
    id:null
},
components: {
AsignacionMaestro
}
}
</script>

<style>

</style>