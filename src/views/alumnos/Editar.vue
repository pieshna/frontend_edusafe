<template>
  <div class="container">
    <h2 class="text-center">Editar Estudiante</h2>
    <br />
    <form enctype="multipart/form-data">
      <div class="row justify-content-center">
        <img :src="usuarios.foto" v-if="hotImage.urlImagen == null" />
        <img :src="hotImage.urlImagen" v-if="hotImage.urlImagen != null" />
        <br />
      </div>
      <div class="container cuerpo">
        <br />
        <br />
        <br />
        <div class="row">
          <div class="form-group col-md-4">
            <label>Nombre</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese el nombre del estudiante"
              v-model="usuarios.nombre"
            />
          </div>
          <div class="form-group col-md-4">
            <label>Apellido</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese el apellido del estudiante"
              v-model="usuarios.apellido"
            />
          </div>
           <div class="form-group col-md-4">
            <label>Nombre de Usuario</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese el nombre de usuario"
              v-model="usuarios.usuario"
            />
          </div>
        </div>
        <br>
        <div class="row">
          <div class="form-group col-md-4">
            <label>Correo</label>
            <input
              type="email"
              class="form-control"
              placeholder="Ingrese la descripcion del producto"
              v-model="usuarios.correo"
            />
          </div>
          <div class="form-group col-md-4">
            <label>Numero</label>
            <input
              type="text"
              class="form-control"
              placeholder="Ingrese el numero de telefono"
              v-model="usuarios.numero"
            />
          </div>
          <div class="form-group col-md-4">
            <label>Foto</label>
            <br />
            <input
              type="file"
              name="img"
              @change="onFileChange"
              accept="image/*"
            />
          </div>
        </div>
        <div class="row">
         
          
          <div class="form-group col-md-4">
            <label>password</label>
            <input
              type="password"
              class="form-control"
              placeholder="Ingrese su contraseña"
              v-model="usuarios.password"
            />
          </div>
        </div>
        <br />
        <div class="row justify-content-between">
          <div class="form-group col-md-2">
            <router-link to="/estudiantes">
              <button class="btn btn-block btn-danger">
                Cancelar
              </button></router-link
            >
          </div>
          <div class="form-group col-md-2 derecha">
            <button class="btn btn-block btn-success" type="submit">
              Agregar
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  name: "EditarEstudiante",
  data() {
    return {
      host: "http://localhost:3000",
      usuarios: {
          nombre:'',
          apellido:'',
          correo:'',
          foto:'',
          usuario:'',
          numero:'',
      },
      hotImage: {
        urlImagen: null,
        imagen: null,
      },
    };
  },
  created() {
    this.consultarPersona();
  },
  methods: {
    async consultarPersona() {
      await axios
        .get(`${this.host}/usuario/${this.id}`)
        .then((respuesta) => {
          this.usuarios = respuesta.data[0];
          console.log(this.usuarios);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
img {
  border: solid 1px;
  max-height: 15rem;
  width: 15rem;
  border-radius: 1rem;
  position: relative;
  z-index: 2;
}
.cuerpo {
  z-index: 1;
  margin-top: -3rem;
  border: solid 1px;
  border-radius: 1rem;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.15);

  backdrop-filter: blur(5px);
}
.col-md-6,
.col-md-4 {
  margin-bottom: 1rem;
}
.col-md-2 {
  max-width: 5rem;
  margin-bottom: 1rem;
  padding: 0rem;
  margin-left: 1rem;
}
.derecha {
  margin-right: 2rem;
}
</style>