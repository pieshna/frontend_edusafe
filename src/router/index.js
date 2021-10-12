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
import Asignacion from '../views/docentes/Asignacion.vue'
import EditarAsignacion from '../views/docentes/EditarAsignacion.vue'
/* Materias */
import Materias from '../views/grados/Home.vue'
import Dashboard from '../views/grados/Dashboard.vue'
import NuevaMateria from '../views/grados/Nuevo.vue'
import EditarMateria from '../views/grados/Editar.vue'
/*Carreras */
import NuevaCarrera from '../views/carreras/Nuevo.vue'
import EditarCarrera from '../views/carreras/Editar.vue'
/* Estudiantes */
import ListarEstudiante from '../views/alumnos/Listar.vue'
import EditarEstudiante from '../views/alumnos/Editar.vue'
import NuevoEstudiante from '../views/alumnos/Nuevo.vue'
import AuthLogin from '../views/auth/login.vue'

/*Ver Clase */
import VerClase from '../views/docentes/VerClase.vue'

/*Tareas */
import NuevaTarea from '../views/docentes/tareas/Nueva.vue'
import VerTarea from '../views/docentes/tareas/Menu.vue'
import EditarTarea from '../views/docentes/tareas/Editar.vue'

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
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/grados/menu',
    name: 'Materias',
    component: Materias
  },
  {
    path: '/grados/nuevo',
    name: 'NuevaMateria',
    component: NuevaMateria
  },
  {
    path: '/grados/edit/:id',
    name: 'EditarMateria',
    component: EditarMateria,
    props:true
  },

  /*Carreras */
  {
    path:'/carreras/nuevo',
    name:'NuevaCarrera',
    component: NuevaCarrera
  },
  {
    path:'/carreras/menu',
    name:'NuevaCarrera',
    component: NuevaCarrera
  },
  {
    path:'/carreras/editar/:id',
    name:'EditarCarrera',
    component: EditarCarrera,
    props:true
  },

  /* Docente */
  {
    path: '/docentes',
    name: 'ListarDocentes',
    component: ListarDocentes
  },
  {
    path: '/asignacion/menu',
    name: 'Asignacion',
    component: Asignacion
  },
  {
    path: '/asignacion/editar/:id',
    name: 'EditarAsignacion',
    component: EditarAsignacion,
    props:true
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

  /*Clases */

  {
    path: '/clase/ver/:gradoId/:materiaId',
    name: 'VerClase',
    component:VerClase,
    props:true
  },

  /*Tareas */
  {
    path: '/tarea/nueva/:claseId/:gradoId',
    name:'NuevaTarea',
    component:NuevaTarea,
    props:true
  },
  {
    path: '/tarea/ver/:clase/:grado',
    name:'VerTarea',
    component:VerTarea,
    props:true
  },
  {
    path: '/tarea/editar/:id',
    name:'EditarTarea',
    component:EditarTarea,
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
