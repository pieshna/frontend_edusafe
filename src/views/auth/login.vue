<template>
  
<div>
    <h1>Login</h1>
    <form >
        <input type="text" autocomplete="false" v-model="credenciales.usuario" placeholder="Ingrese su usuario o correo">
        <input type="password" autocomplete="false" v-model="credenciales.password" placeholder="Ingrese su contraseña">
        <input type="submit" value="Iniciar Sesion">
    {{credenciales}}
    </form>
</div>

</template>

<script>
export default {
name:"login",
data() {
    return {
        credenciales:{
            usuario:"",
            password:"",
        },
    }
},
created(){
 this.eliminarSidebar()
},
methods:{
    eliminarSidebar(){
        let sidebar = document.querySelector(".sidebar")
        if(!sidebar){
            alert("No sidebar")
        }else{
            let padre= sidebar.parentNode;
            padre.removeChild(sidebar)
            document.querySelector(".contenido").classList.remove("py-5")
            document.querySelector(".contenido").classList.remove("contenido")
            document.querySelector(".home_content").classList.remove("py-2")
            document.querySelector(".home_content").classList.remove("home_content")
        }

        console.log(process.env.VUE_APP_DB_HOST);
    },


}
}
</script>

<style scoped>
</style>