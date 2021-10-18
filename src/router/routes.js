// LAYOUTS
const mainLayout = () => import("layouts/MainLayout.vue");
const landingLayout = () => import("layouts/LandingLayout.vue");

// PAGES
const resourcesPage = () => import("src/pages/Resources.vue");
const installationsPage = () => import("src/pages/Installations.vue");
const researchPage = () => import("src/pages/Research.vue");
const planetPage = () => import("pages/Planet.vue");
const defensePage = () => import("pages/Defense.vue");
const convertPage = () => import("pages/Convert.vue");
const planetInfoPage = () => import("pages/PlanetInfo.vue");

const landingPage = () => import("src/pages/Landing1.vue");

// ROUTES
const routes = [
  //TODO: change this component
  {
    path: "/",
    component: mainLayout,
    children: [{ path: "", component: resourcesPage }],
  },
  {
    path: "/resources",
    component: mainLayout,
    children: [{ path: "", component: resourcesPage }],
  },
  {
    path: "/installations",
    component: mainLayout,
    children: [{ path: "", component: installationsPage }],
  },
  {
    path: "/research",
    component: mainLayout,
    children: [{ path: "", component: researchPage }],
  },
  {
    path: "/planet",
    component: mainLayout,
    children: [{ path: "", component: planetPage }],
  },
  {
    path: "/defense",
    component: mainLayout,
    children: [{ path: "", component: defensePage }],
  },
  {
    path: "/convert",
    component: mainLayout,
    children: [{ path: "", component: convertPage }],
  },
  {
    path: "/planetinfo",
    component: mainLayout,
    children: [{ path: "", component: planetInfoPage }],
  },
  {
    path: "/landing",
    component: landingLayout,
    children: [{ path: "", component: landingPage }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
