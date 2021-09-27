
const mainLayout = import('layouts/MainLayout.vue');
const indexPage = import('src/pages/Resources.vue');
const planetPage = import('pages/Planet.vue');

const routes = [
  {
    path: '/',
    component:  mainLayout,
    children: [
      { path: '', component: indexPage },
    ]
  },
  {
    path: '/planet',
    component:  mainLayout,
    children: [
      { path: '', component: planetPage },
    ]
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
