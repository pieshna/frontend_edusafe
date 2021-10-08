<template>
  <div class="container">
    <div class="container">
      <div class="row justify-content-end">
        <div class="col-auto" v-if="mensaje == 'usuarios'">
          <select @change="filtro" class="form-select" v-model="search.categoria">
            <option value="0" selected>General</option>
            <option value="2">Secretario (a)</option>
            <option value="3">Docente</option>
            <option value="4">Estudiante</option>
            <option value="5">Encargado</option>
          </select>
        </div>
        <div class="col-md-2">
          <input
            type="text"
            placeholder="Buscar usuario"
            @keyup="buscarPersona"
            v-model="search.item" class="form-control"
          />
        </div>
      </div>
    </div>
    <router-link :to="'/' + mensaje + '/nuevo'">
      <a class="btn">Nuevo</a>
    </router-link>
    <!-- Empieza la lista -->
    <h1 class="text-center">{{ mensaje }}</h1>
    <br />
    <div class="row justify-content-center">
      <div class="col-md-3 py-2" v-for="usuario in displayedPersonas" :key="usuario.id">
        <div class="card" v-if="search.categoria == 0 || search.categoria == usuario.rol">
          <img :src="host + 'ver/' + usuario.foto" class="card-img-top" />
          <div class="card-body">
            <h5 class="card-title">
              {{ usuario.nombre }}
            </h5>
            <h5 class="card-title">{{ usuario.apellido }}</h5>

            <ul class="card-text">
              <li>
                Usuario:
                <p>{{ usuario.usuario }}</p>
              </li>
              <li>
                Correo:
                <p>{{ usuario.correo }}</p>
              </li>
              <li>
                Numero:
                <p>{{ usuario.numero }}</p>
              </li>
              <li v-if="usuario.rol == 1 && mensaje == 'usuarios'">
                Rol:
                <p>Director</p>
              </li>
              <li v-if="usuario.rol == 2 && mensaje == 'usuarios'">
                Rol:
                <p>Secretario (a)</p>
              </li>
              <li v-if="usuario.rol == 3 && mensaje == 'usuarios'">
                Rol:
                <p>Docente</p>
              </li>
              <li v-if="usuario.rol == 4 && mensaje == 'usuarios'">
                Rol:
                <p>Estudiante</p>
              </li>
              <li v-if="usuario.rol == 5 && mensaje == 'usuarios'">
                Rol:
                <p>Encargado</p>
              </li>
            </ul>
            <router-link :to="'/' + mensaje + '/edit/' + usuario.id">
              <button class="btn btn-block btn-primary">
                Editar
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <br /><br />
    <div class="row justify-content-center" v-if="pages.length > 1">
      <div class="btn-group col-md-2">
        <button
          type="button"
          v-if="page != 1"
          @click="page = 1"
          class="btn btn-sm btn-outline-secondary"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <button
          type="button"
          v-if="page != 1"
          @click="page--"
          class="btn btn-sm btn-outline-secondary"
        >
          <i class="fa-solid fa-angle-left"></i>
        </button>
        <button
          type="button"
          v-if="page >= 3"
          @click="page -= 2"
          class="btn btn-sm btn-outline-secondary"
        >
          {{ page - 2 }}
        </button>
        <button
          type="button"
          v-if="page != 1"
          @click="page--"
          class="btn btn-sm btn-outline-secondary"
        >
          {{ page - 1 }}
        </button>
        <div
          type="button"
          @click="page = Numerodepagina"
          v-for="Numerodepagina in pages.slice(page - 1, page + 3)"
          :key="Numerodepagina"
          class="btn btn-sm btn-outline-secondary"
        >
          <div v-if="Numerodepagina == page" class="seleccionado">
            {{ Numerodepagina }}
          </div>
          <div v-if="Numerodepagina != page">
            {{ Numerodepagina }}
          </div>
        </div>
        <button
          type="button"
          v-if="page < pages.length"
          @click="page++"
          class="btn btn-sm btn-outline-secondary"
        >
          <i class="fa-solid fa-angle-right"></i>
        </button>
        <button
          type="button"
          v-if="page < pages.length"
          @click="page = pages.length"
          class="btn btn-sm btn-outline-secondary"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ListarPersona",
  props: {
    datosUsuarios: null,
    mensaje: String,
  },
  data() {
    return {
      usuarios: null,
      search: {
        item: "",
        setTimeout: null,
        categoria: 0,
      },
      host: process.env.VUE_APP_DB_HOST,
      page: 1,
      perPage: 4,
      pages: [],
      exportamos: 1,
    };
  },
  methods: {
    paginate(persona) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      this.setPersonas();
      return persona.slice(from, to);
    },
    setPersonas() {
      this.pages = [];
      let numerodepaginas = Math.ceil(this.usuarios.length / this.perPage);
      for (let index = 1; index <= numerodepaginas; index++) {
        this.pages.push(index);
      }
    },
    buscarPersona() {
      if (this.search.item != "") {
        clearTimeout(this.search.setTimeout);
        this.search.setTimeout = setTimeout(() => {
          this.usuarios = this.datosUsuarios;
          const valor = this.usuarios.filter((item) => {
            this.pages = [];
            let resultado = item.nombre.toLowerCase().includes(this.search.item.toLowerCase());
            if (resultado == false) {
              resultado = item.apellido.toLowerCase().includes(this.search.item.toLowerCase());
            }
            return resultado;
          });
          this.usuarios = valor;
        }, 300);
      } else {
        this.usuarios = this.datosUsuarios;
      }
    },
    filtro() {
      this.usuarios = this.datosUsuarios;
      this.buscarPersona();
      const valor = this.usuarios.filter((item) => {
        if (item.rol == this.search.categoria) {
          this.pages = [];
          return true;
        }
      });
      this.usuarios = valor;
      if (this.search.categoria == 0) {
        this.usuarios = this.datosUsuarios;
      }
    },
  },
  computed: {
    displayedPersonas() {
      if (this.exportamos === 1 || this.exportamos == 2) {
        this.usuarios = this.datosUsuarios;
        this.exportamos++;
      }
      return this.paginate(this.usuarios);
    },
  },
  watch: {
    personas() {
      this.setPersonas();
    },
  },
};
</script>

<style scoped>
h1::first-letter {
  text-transform: uppercase;
}

.card {
  align-items: center;
  background: #f5f6fa;
}
/* .py-2 {
  border: 2px solid;
} */
.card img {
  max-width: 10rem;
  top: -8rem;
}

.card-body ul {
  list-style: none;
}
.card-body li {
  margin-left: -1.5rem;
  display: flex;
  font-weight: bold;
}

.card-body li p {
  left: 0.5rem;
  font-weight: normal;
}

.card-title {
  text-align: center;
}
.card-body {
  background: #7f8fa6;
  flex-basis: auto;
}
.seleccionado {
  color: red;
}
</style>
