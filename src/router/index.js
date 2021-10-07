import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
/* Importaciones */
/* Usuarios */
import ListarUsuario from '../views/usuarios/Listar.vue'
import NuevoUsuario from '../views/usuarios/Nuevo.vue'
import EditarUsuario from '../views/usuarios/Editar.vue'
/* Docentes */
import ListarDocentes from '../views/docentes/Listar.vue'
import EditarDocente from '../views/docentes/Editar.vue'
import NuevoDocente from '../views/docentes/Nuevo.vue'
/* Materias */
import Materias from '../views/grados/Home.vue'
/* Estudiantes */
import ListarEstudiante from '../views/alumnos/Listar.vue'
import EditarEstudiante from '../views/alumnos/Editar.vue'
import NuevoEstudiante from '../views/alumnos/Nuevo.vue'
import AuthLogin from '../views/auth/login.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  /* Usuarios */
  {
    path: '/usuarios',
    name: 'ListarUsuario',
    component: ListarUsuario
  },
  {
    path:'/usuarios/nuevo',
    name:'NuevoUsuario',
    component:NuevoUsuario
  },
  {
    path:'/usuarios/edit/:id',
    name:'EditarUsuario',
    component:EditarUsuario,
    props:true
  },


  /* Estudiante */
  {
    path: '/estudiantes',
    name: 'ListarEstudiante',
    component: ListarEstudiante
  },
  {
    path: '/estudiantes/nuevo',
    name: 'NuevoEstudiante',
    component: NuevoEstudiante
  },
  {
    path: '/estudiantes/edit/:id',
    name: 'EditarEstudiante',
    component: EditarEstudiante,
    props:true
  },
  /* Materias */
  {
    path: '/grados',
    name: 'Materias',
    component: Materias
  },

  /* Docente */
  {
    path: '/docentes',
    name: 'ListarDocentes',
    component: ListarDocentes
  },
  {
    path: '/docentes/nuevo',
    name: 'NuevoDocente',
    component: NuevoDocente
  },
  {
    path: '/docentes/edit/:id',
    name: 'EditarDocente',
    component: EditarDocente,
    props:true
  },

  /* Encargado */
  
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  //Routes Auth
  {
    path:'/login',
    name:'AuthLogin',
    component: AuthLogin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
