import Vue from "vue";
import VueRouter from "vue-router";
import store from "./../store";
import login from "../views/Login.vue";
//import home from '../views/Home.vue';
import notFound from "../views/NotFound.vue";
import client from "../views/Client.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/home",
    name: "home",
    // component: home,
    redirect: "/client"
  },
  {
    path: "/client",
    name: "client",
    component: client
  },
  {
    path: "/mitigation",
    name: "mitigation",
    component: () => import("../views/Mitigation.vue")
  },
  {
    path: "/blacklist",
    name: "blacklist",
    component: () => import("../views/Blacklist.vue")
  },
  {
    path: "/protect",
    name: "protect",
    component: () => import("../views/ProtectMode.vue")
  },
  {
    path: "/edit-ip",
    name: "edit-ip",
    component: () => import("../views/EditIp.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: notFound
  }
];

const router = new VueRouter({
  linkExactActiveClass: "active",
  routes
});

router.beforeEach((to, from, next) => {
  const cookie = localStorage.getItem("cookie");
  let isAuthenticated = store.state.isAuthenticated;

  if (cookie) {
    isAuthenticated = true;
  }

  const pathsWithoutAuthentication = ["login"];

  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next("/login");
    return;
  }

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next("/home");
    return;
  }

  next();
});

export default router;
