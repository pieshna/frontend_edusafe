<template>
  <div class="fondo">
    <br />
    <div class="box">
      <form @submit.prevent="iniciarSesion">
        <h1>Inicio de Sesion</h1>
        <p>{{mensaje}}</p>
        <input
          type="text"
          autocomplete="false"
          v-model="credenciales.usuario"
          placeholder="usuario o correo"
          required
        />
        <input
          type="password"
          autocomplete="false"
          v-model="credenciales.password"
          placeholder="contraseña"
          required
        />
        <input type="submit" value="Iniciar Sesion" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      credenciales: {
        usuario: "mmpm@gmail.com",
        password: "ldkafjslkdfj",
      },
      mensaje:"",
      host: process.env.VUE_APP_DB_HOST,
    };
  },
  created() {
    if (this.$localStorage.get("token") != null) {
      this.$router.push("/");
    }
  },
  methods: {
    eliminarSidebar() {
      let sidebar = document.querySelector(".sidebar");
      if (!sidebar) {
        //alert("No sidebar");
      } else {
        let padre = sidebar.parentNode;
        padre.removeChild(sidebar);
        document.querySelector(".contenido").classList.remove("py-5");
        document.querySelector(".home_content").classList.add("fondo");
        document.querySelector(".contenido").classList.remove("contenido");
        document.querySelector(".home_content").classList.remove("py-2");
        document.querySelector(".home_content").classList.remove("home_content");
      }
    },
    async iniciarSesion() {
      await axios
        .post(this.host + "login", this.credenciales)
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data);
            this.$localStorage.set("token", "hola");
            this.$localStorage.set("salt", response.data.rol);
            this.$localStorage.set("teken", response.data.id);
            this.$localStorage.set("photo", response.data.foto);
            this.$router.go("/");
          }else{
            this.mensaje="Usuario / contraseña no valido"
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.fondo {
  width: 100%;
  height: 100%;
  background: #34495e;
  position: absolute;
}

.box {
  border-radius: 1rem;
  width: 39rem;
  padding: 2.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #2c3e50;
  text-align: center;
}

.box h1, p {
  color: white;
  text-transform: uppercase;
  font-weight: 500;
}

.box input[type="text"],
.box input[type="password"] {
  border: 0;
  background: none;
  display: block;
  margin: 1.25rem auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 0.875rem 0.625rem;
  outline: none;
  color: white;
  border-radius: 2rem;
  transition: 0.25s;
}

.box input[type="text"]:hover,
.box input[type="password"]:hover {
  transition: all 0.5s ease;
  width: 26rem;
  border-color: #27ae60;
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
  width: 26rem;
  border-color: #e67e22;
}

.box input[type="submit"] {
  border: 0;
  background: none;
  display: block;
  margin: 1.25rem auto;
  text-align: center;
  border: 2px solid #3498db;
  padding: 0.875rem 2rem;
  outline: none;
  color: white;
  border-radius: 2rem;
  transition: 0.25s;
}

.box input[type="submit"]:hover {
  background: #1abc9c;
}
</style>
