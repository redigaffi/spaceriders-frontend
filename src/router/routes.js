


// LAYOUTS
const mainLayout = () => import("layouts/MainLayout.vue");
const basicLayout = () => import("layouts/BasicLayout.vue");
const landingLayout = () => import("layouts/LandingLayout.vue");
const NoLoginLayout = () => import("layouts/NoLogin.vue");

// PAGES
const resourcesPage = () => import("src/pages/Resources.vue");
const installationsPage = () => import("src/pages/Installations.vue");
const researchPage = () => import("src/pages/Research.vue");
const planetPage = () => import("pages/Planet.vue");
const defensePage = () => import("pages/Defense.vue");
const planetInfoPage = () => import("pages/PlanetInfo.vue");

const planetExplorer = () => import("pages/PlanetExplorer.vue");

const landingPage = () => import("src/pages/Landing1.vue");

// ROUTES
const routes = [
  {
    path: "/",
    name: "landing",
    component: landingLayout,
    children: [{ path: "/", component: landingPage, name: "landing", meta: {title: "Landing"} }],
  },
  {
    path: "/explorer",
    name: "explorer",
    component: basicLayout,
    children: [{ path: "", component: planetExplorer, name: "explorer", meta: {requiresAuth: true, requiresPlanet: false, menu: false, title: "Planet Explorer"} }],
  },
  {
    path: "/overview",
    component: mainLayout,
    name: "overview",
    meta: { requiresAuth: true, requiresPlanet: true, menu: true, title: "Overview" },
    children: [
      { path: "", component: planetInfoPage, meta: { title: "Overview"} },
      { path: "/planet", component: planetPage, name: "planet", meta: { menu: true,requiresAuth: true, requiresPlanet: false, title: "Planet" } },
      { path: "/resources", component: resourcesPage, name: "resources", meta: {  menu: true, requiresAuth: true, requiresPlanet: true, title: "Resources" }  },
      { path: "/installations", component: installationsPage, name: "installations", meta: { menu: true, requiresAuth: true, requiresPlanet: true, title: "Installations" }  },
      { path: "/research", component: researchPage, name: "research", meta: { menu: true,requiresAuth: true, requiresPlanet: true, title: "Research" }  },
      { path: "/defense", component: defensePage, name: "defense", meta: { menu: true,requiresAuth: true, requiresPlanet: true, title: "Defense" } },
    ],
  },
  {
    path: "/nouser",
    component: NoLoginLayout,
    name: "nouser",
    meta: { requiresAuth: false, requiresPlanet: false, menu: false, title: "Login" },
  },
  

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
