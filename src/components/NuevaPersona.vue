<template>
  <div class="container">
    <h1>{{ mensaje }}</h1>
    <!-- Imagen Dinamica -->
    <div>
      <img :src="persona.foto" v-if="hotImagen.urlImagen == null" />
      <img :src="hotImagen.urlImagen" v-if="hotImagen.urlImagen != null" />
      <br />
    </div>
    <form @submit.prevent="envioPersona()" method="post">
      <input type="text" v-model="persona.nombre" placeholder="Ingrese el nombre" />
      <input type="text" v-model="persona.apellido" placeholder="Ingrese el apellido" />
      <input type="email" v-model="persona.correo" placeholder="Ingrese el correo" />
      <input type="text" v-model="persona.usuario" placeholder="Usuario" />
      <br>
      <a v-on:click="genPassword" class="btn btn-primary" >Generar Contraseña</a>
      <input type="password" v-model="persona.password" placeholder="Contraseña" />
      <input type="text" v-model="persona.numero" placeholder="Ingrese el numero" />
      <select v-model="persona.rol" v-if="(url = 'usuario')" @change="resetEncargado">
        <option value="0" disabled>Seleccione el tipo</option>
        <option value="1">Director</option>
        <option value="2">Secretario (a)</option>
        <option value="3">Docente</option>
        <option value="4">Estudiante</option>
        <option value="5">Encargado</option>
      </select>
      

      <div class="container" v-if="persona.rol == 4">
        <h4>Ingrese el encargado</h4>
        <input
          type="text"
          @keyup="buscarEncargado"
          v-model="busqueda.item"
          placeholder="Ingrese encargado"
        />

        <!-- datos de encargado -->
        <div v-if="encontramosEncargado==1">
          <img :src="encargado.foto" alt="">
          <br>
        <input type="text" v-model="encargado.nombre" placeholder="Ingrese el nombre" />
        <input type="text" v-model="encargado.apellido" placeholder="Ingrese el apellido" />
        <input type="email" v-model="encargado.correo" placeholder="Ingrese el correo" />
        <input type="text" v-model="encargado.usuario" placeholder="Usuario" />
        <input type="password" v-model="encargado.password" placeholder="Contraseña" />
        <input type="text" v-model="encargado.numero" placeholder="Ingrese el numero" /></div>
      </div>
      <input type="submit" value="Guardar" />
    </form>
    {{ persona }}
    <h4>encargado</h4>
    {{ encargado }}
  </div>
</template>

<script>
const openEls = document.querySelectorAll("[data-open]");
const isVisible = "is-visible";

for(const el of openEls) {
  el.addEventListener("click", function() {
    const modalId = this.dataset.open;
    document.getElementById(modalId).classList.add(isVisible);
  });
}
import axios from "axios";
export default {
  name: "NuevaPersona",
  props: {
    mensaje: null,
    datosPersona: null,
    url: null,
  },
  data() {
    return {
      persona: {
        nombre: "",
        apellido: "",
        correo: "",
        usuario: "",
        password: "",
        foto: "",
        numero: "",
        rol: 0,
        estado: 1,
      },
      encargado: {},
      encontramosEncargado:0,
      estudianteId: null,
      busqueda: {
        item: "",
        timeOut: null,
      },
      host: process.env.VUE_APP_DB_HOST,
      hotImagen: {
        urlImagen:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
        imagen: null,
      },
    };
  },
  methods: {
    async envioPersona() {
      this.persona.foto = this.hotImagen.urlImagen;
      try {
        //console.log({ mensaje: "enviamos", persona: this.persona });
        const result = await axios
          .post(this.host + this.url, this.persona)
          .then((response) => {
            this.estudianteId = response.data.id[0].insertId;
          })
          .catch((error) => {
            /* console.log({
              peticion: "error con la peticion",
              error: error.response.data,
              estado: error.response.status,
            }); */
            //alert(error.response.data);
          });
        //console.log({ mensaje: "resultado", result });
      } catch (error) {
        console.log({ Error: "error en try", error });
      }
    },
    async buscarEncargado() {
      if (this.busqueda.item != "" && this.persona.rol == 4) {
        clearTimeout(this.busqueda.timeOut);
        this.busqueda.timeOut = setTimeout(() => {
          try {
            console.log("buscamos encargado");
            axios
              .get(this.host + "encargado/buscar/" + this.busqueda.item)
              .then((response) => {
                this.encargado = response.data[0];
                  this.encontramosEncargado=1
                  //verificamos que se encontro
                if(this.encargado==null) {
                  this.encargado ={}
                this.encontramosEncargado=0
                  }
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            console.log({ Error: "error en try", error });
          }
        }, 500);
      } else {
        this.encargado = {};
        this.encontramosEncargado=0
      }
    },
    resetEncargado() {
      this.busqueda.item = "";
      this.encontramosEncargado=0
      this.encargado = {};
    },

    onFileChange(event) {
      this.hotImagen.imagen = event.target.files[0];
      //this.producto.imagen=`${fileData.name}`;
      this.hotImagen.urlImagen = URL.createObjectURL(this.hotImagen.imagen);
      console.log(this.hotImagen.imagen);
    },
    genPassword(){
    this.persona.password=Math.random().toString(36).substring(2,10)
    
  }
  },

  
};
</script>

<style scoped>
img {
  max-width: 10rem;
  top: -8rem;
}
</style>
