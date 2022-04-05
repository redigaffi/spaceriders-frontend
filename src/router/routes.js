// LAYOUTS
const mainLayout = () => import("layouts/MainLayout.vue");
const landingLayout = () => import("layouts/LandingLayout.vue");

// PAGES
const resourcesPage = () => import("src/pages/Resources.vue");
const installationsPage = () => import("src/pages/Installations.vue");
const researchPage = () => import("src/pages/Research.vue");
const planetPage = () => import("pages/Planet.vue");
const defensePage = () => import("pages/Defense.vue");
const planetInfoPage = () => import("pages/PlanetInfo.vue");

const landingPage = () => import("src/pages/Landing1.vue");

// ROUTES
const routes = [
  {
    path: "/",
    component: landingLayout,
    children: [{ path: "/", component: landingPage, name: "landing" }],
  },
  //TODO: change this component
  {
    path: "/overview",
    component: mainLayout,
    name: "overview",
    // beforeEnter: (to, from, next) => {
    //   const store = JSON.parse(localStorage.getItem("store"));
    //   if (store) {
    //     if (store.jwt) {
    //       next();
    //     } else {
    //       next("/");
    //     }
    //   }
    // },
    children: [
      { path: "", component: planetInfoPage },
      { path: "/resources", component: resourcesPage, name: "resources" },
      { path: "/installations", component: installationsPage, name: "installations" },
      { path: "/research", component: researchPage, name: "research" },
      { path: "/planet", component: planetPage, name: "planet" },
      { path: "/defense", component: defensePage, name: "defense" },
    ],
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
