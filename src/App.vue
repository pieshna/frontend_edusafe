<template>
  <Sidebar />
  <router-view/>
</template>
<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Sidebar
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
.home_content {
  background:blue;
  position: absolute;
  height: 100%;
  width: calc(100%-5rem);
  left: 5rem;
  transition: all 0.5s ease;
}

.home_content .text {
  font-size: 25px;
  font-weight: 500;
  color: #1d1b31;
  margin-top: 12px;
}
.sidebar.active ~ .home_content {
  background:red;
  width: calc(100%-15rem);
  left: 15rem;
}

</style>
