
const mainLayout = import('layouts/MainLayout.vue');
const indexPage = import('pages/Index.vue');

const routes = [
  {
    path: '/',
    component:  mainLayout,
    children: [
      { path: '', component: indexPage },
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
