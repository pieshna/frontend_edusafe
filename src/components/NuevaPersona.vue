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
      <input
        type="text"
        v-model="persona.nombre"
        placeholder="Ingrese el nombre"
      />
      <input
        type="text"
        v-model="persona.apellido"
        placeholder="Ingrese el apellido"
      />
      <input
        type="email"
        v-model="persona.correo"
        placeholder="Ingrese el correo"
      />
      <input type="text" v-model="persona.usuario" placeholder="Usuario" />
      <input
        type="password"
        v-model="persona.password"
        placeholder="Contraseña"
      />
      <input
        type="text"
        v-model="persona.numero"
        placeholder="Ingrese el numero"
      />
      <input type="submit" value="Guardar" />
    </form>
    {{ persona }}
    {{ host }}
  </div>
</template>

<script>
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
        estado:1
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
        console.log({ mensaje: "enviamos", persona: this.persona });
        const result = await axios
          .post(`${this.host}usuario`, this.persona)
          .then((response) => {
            console.log({
              mensaje: "recibimos",
              datosRecibidos: response.data,
            });
          })
          .catch((error) => {
            console.log({peticion:"error con la peticion",error:error.response.data,estado:error.response.status});
            alert(error.response.data)
          });
        console.log({ mensaje: "resultado", result });
      } catch (error) {
        console.log({ Error: "error en try", error });
      }
    },

    onFileChange(event) {
      this.hotImagen.imagen = event.target.files[0];
      //this.producto.imagen=`${fileData.name}`;
      this.hotImagen.urlImagen = URL.createObjectURL(this.hotImagen.imagen);
      console.log(this.hotImagen.imagen);
    },
  },
};
</script>

<style scoped>
img {
  max-width: 10rem;
  top: -8rem;
}
</style>
