import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListarUsuario from '../views/usuarios/Listar.vue'
import ListarEstudiante from '../views/alumnos/Listar.vue'
import EditarEstudiante from '../views/alumnos/Editar.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/usuarios',
    name: 'ListarUsuario',
    component: ListarUsuario
  },
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
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
