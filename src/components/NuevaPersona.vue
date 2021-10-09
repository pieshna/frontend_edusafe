<template>
  <div class="container">
    <h1>{{ mensaje }}</h1>
    <!-- Imagen Dinamica -->
    <div>
      <img :src="host + 'ver/' + persona.foto" v-if="persona.foto != ''" />
      <img :src="host + 'ver/' + hotImagen.urlImagen" v-if="persona.foto == ''" />
      <br />
    </div>
    <form @submit.prevent="envioPersona()">
      <input type="text" v-model="persona.nombre" placeholder="Ingrese el nombre" />
      <input type="text" v-model="persona.apellido" placeholder="Ingrese el apellido" />
      <input type="email" v-model="persona.correo" placeholder="Ingrese el correo" />
      <input type="text" v-model="persona.usuario" placeholder="Usuario" />
      <br />
      <a v-on:click="genPassword" v-if="urlEdit == null" class="btn btn-primary">
        <i class="material-icons-outlined"></i>
        Generar Contraseña</a
      >
      <input
        type="password"
        v-model="persona.password"
        v-if="urlEdit == null"
        placeholder="Contraseña"
      />
      <input type="text" v-model="persona.numero" placeholder="Ingrese el numero" />
      <select v-model="persona.rol" v-if="url == 'usuario'" @change="resetEncargado">
        <option value="0" disabled>Seleccione el tipo</option>
        <option value="1">Director</option>
        <option value="2">Secretario (a)</option>
        <option value="3">Docente</option>
        <option value="4">Estudiante</option>
        <option value="5">Encargado</option>
      </select>

      <select v-model="estudiante.carrera_id" v-if="persona.rol == 4" @change="datosGrados">
        <option value="" selected disabled>Seleccione Carrera</option>
        <option v-for="carrera in datosCarrera" :key="carrera.id" :value="carrera.id">{{
          carrera.Nombre
        }}</option>
      </select>
      <select v-model="estudiante.grado_id" v-if="estudiante.carrera_id != ''">
        <option value="" disabled>Seleccione el Grado</option>
        <option v-for="grado in datosGrado" :key="grado.id" :value="grado.id">{{
          grado.nombre
        }}</option>
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
        <div v-if="encontramosEncargado == 1 && urlEdit == null">
          <img :src="encargado.foto" alt="" />
          <br />
          <input type="text" v-model="encargado.nombre" placeholder="Ingrese el nombre" />
          <input type="text" v-model="encargado.apellido" placeholder="Ingrese el apellido" />
          <input type="email" v-model="encargado.correo" placeholder="Ingrese el correo" />
          <input type="text" v-model="encargado.usuario" placeholder="Usuario" />
          <input type="password" v-model="encargado.password" placeholder="Contraseña" />
          <input type="text" v-model="encargado.numero" placeholder="Ingrese el numero" />
        </div>
        <!-- datos de encargado edit -->
        <div v-if="encontramosEncargado == 1 && urlEdit != null">
          <img :src="encargado.foto" alt="" />
          <br />
          <input type="text" v-model="encargado.nombre" disabled />
          <input type="text" v-model="encargado.apellido" disabled />
          <input type="email" v-model="encargado.correo" disabled />
          <input type="text" v-model="encargado.usuario" disabled />
          <input type="text" v-model="encargado.numero" disabled />
        </div>
      </div>
      <input type="submit" value="Guardar" />
    </form>
    <!-- {{ persona }}
    {{ datosGrado }}
    <h5>estudiante</h5>
    {{ estudiante }}
    <h4>encargado</h4>
    {{ encargado }} -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "NuevaPersona",
  props: {
    mensaje: null,
    url: null,
    urlEdit: null,
    rol: 0,
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
      estudiante: {
        usuario_id: "",
        grado_id: "",
        carrera_id: "",
      },
      datosCarrera: {},
      datosGrado: {},
      encargado: {},
      encontramosEncargado: 0,
      estudianteId: null,
      busqueda: {
        item: "",
        timeOut: null,
      },
      enviado: false,
      host: process.env.VUE_APP_DB_HOST,
      hotImagen: {
        urlImagen: "profile.png",
        imagen: null,
      },
    };
  },
  created() {
    if (this.urlEdit != null) {
      this.creacion();
    } else if (this.rol == 4) {
      this.persona.rol = this.rol;
      this.resetEncargado();
    }else{
      this.persona.rol = this.rol;
      
    }
  },
  methods: {
    async creacion() {
      try {
        await axios
          .get(this.urlEdit)
          .then((respuesta) => {
            this.persona = respuesta.data[0];
            if (this.persona.rol == 4) {
              this.datosCarreras();
            }
          })
          .catch((error) => {
            //console.log(error);
          });
        if (this.persona.rol == 4) {
          await axios
            .get(this.host + "grado/estudiante/" + this.persona.id)
            .then((respuesta) => {
              this.estudiante.carrera_id = respuesta.data[0].carrera_id;
              this.datosGrados();
              this.estudiante.grado_id = respuesta.data[0].grado_id;
            })
            .catch((error) => {
              //console.log(error);
            });
          await axios
            .get(this.host + "encargado/estudiante/" + this.persona.id)
            .then((respuesta) => {
              this.encargado = respuesta.data[0];
              this.encontramosEncargado = 1;
              this.estudiante.usuario_id = this.persona.id;
            });
        }
      } catch (error) {}
    },
    async envioPersona() {
      if (!this.enviado) {
        if (this.persona.foto == "") {
          this.persona.foto = this.hotImagen.urlImagen;
        }
        if (this.urlEdit == null) {
          try {
            await axios
              .post(this.host + "usuario", this.persona)
              .then((response) => {
                //console.log("Se envio");
                this.estudianteId = response.data.id[0].insertId;
              })
              .catch((error) => {});

            if (this.persona.rol == 4 && this.estudiante.grado_id != 0) {
              this.estudiante.usuario_id = this.estudianteId;
              let id = null;
              await axios.post(this.host + "alumno", this.estudiante).then((response) => {
                id = response.data[0].insertId;
                //console.log({guarddamos:"id ", id});
                if (this.encontramosEncargado == 1) {
                  //console.log("envioEncargado");
                  const datosAEnviar = {
                    estudiante_id: id /* idEstudiante */,
                    persona_id: this.encargado.id,
                  };
                  //console.log(datosAEnviar);
                  axios
                    .post(this.host + "encargado/existente", datosAEnviar)
                    .then((response) => {});
                }
              });
            }
            this.enviado =true
            //console.log({ mensaje: "resultado", result });
          } catch (error) {
            console.log({ Error: "error en try", error });
            this.enviado = false
          } 
        } else {
          try {
            await axios
              .put(this.host + "usuario/" + this.persona.id, this.persona)
              .then((response) => {});
            if (this.rol == 4) {
              await axios
                .put(this.host + "alumno/" + this.estudiante.usuario_id, this.estudiante)
                .then((response) => {});
            }
            this.enviado =true
          } catch (error) {
            this.enviado =false
            console.log({ Error: "error en try", error });
          }
        }
      }
    },
    async datosCarreras() {
      try {
        const result = await axios
          .get(this.host + "carrera")
          .then((response) => {
            //console.log(response.data);
            this.datosCarrera = response.data;
          })
          .catch((error) => {});
      } catch (error) {
        console.log({ Error: "error en try", error });
      }
    },
    async datosGrados() {
      try {
        const result = await axios
          .get(this.host + "grado/carrera/" + this.estudiante.carrera_id)
          .then((response) => {
            //console.log(response.data);
            this.datosGrado = response.data;
          })
          .catch((error) => {});
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
                this.encontramosEncargado = 1;
                //verificamos que se encontro
                if (this.encargado == null) {
                  this.encargado = {};
                  this.encontramosEncargado = 0;
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
        this.encontramosEncargado = 0;
      }
    },
    resetEncargado() {
      this.busqueda.item = "";
      this.encontramosEncargado = 0;
      this.encargado = {};
      if (this.persona.rol == 4) {
        this.datosCarreras();
      }
    },

    onFileChange(event) {
      this.hotImagen.imagen = event.target.files[0];
      //this.producto.imagen=`${fileData.name}`;
      this.hotImagen.urlImagen = URL.createObjectURL(this.hotImagen.imagen);
      console.log(this.hotImagen.imagen);
    },
    genPassword() {
      this.persona.password = Math.random()
        .toString(36)
        .substring(2, 10);
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
