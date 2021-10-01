import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
/* Importaciones */
/* Usuarios */
import ListarUsuario from '../views/usuarios/Listar.vue'
import NuevoUsuario from '../views/usuarios/Nuevo.vue'
/* Estudiantes */
import ListarEstudiante from '../views/alumnos/Listar.vue'
import EditarEstudiante from '../views/alumnos/Editar.vue'
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


  /* Estudiante */
  {
    path: '/estudiantes',
    name: 'ListarEstudiante',
    component: ListarEstudiante
  },
  {
    path: '/estudiantes/edit/:id',
    name: 'EditarEstudiante',
    component: EditarEstudiante,
    props:true
  },


  /* Docente */


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
