<template>
  <Sidebar v-if="this.$localStorage.get('token') !=null" />
  <router-view v-if="this.$localStorage.get('token') ==null"  />
</template>
<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Sidebar
  },created(){
    if(this.$localStorage.get('token')==null){
      this.$router.push('/login')
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
/* 
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
/* body{
  position:absolute;
    height:100%;
    width: calc(100%-15rem);
    left:15rem;
} */

</style>
