import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import AddEditShellScript from "@/components/shell-scripts/Add-Edit-Shell-Script";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/add-edit-shell-script",
        name: "AddEditShellScript",
        component: AddEditShellScript,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;