
const mainLayout = import('layouts/MainLayout.vue');
const resourcesPage = import('src/pages/Resources.vue');
const installationsPage = import('src/pages/Installations.vue');
const planetPage = import('pages/Planet.vue');

const routes = [
  //TODO: change this component
  {
    path: '/',
    component:  mainLayout,
    children: [
      { path: '', component: resourcesPage },
    ]
  },
  {
    path: '/resources',
    component:  mainLayout,
    children: [
      { path: '', component: resourcesPage },
    ]
  },
  {
    path: '/installations',
    component:  mainLayout,
    children: [
      { path: '', component: installationsPage },
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
