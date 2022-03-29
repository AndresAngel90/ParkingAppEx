import { RouteLocationNormalized, RouteLocationRaw } from "vue-router";

export const authGuard = (
    to: RouteLocationNormalized
): RouteLocationRaw | boolean => {
    if (to.meta.requiresAuth && localStorage.getItem("authToken") == null) {
        return {
            path: '/login'
        }
    }
    if (to.fullPath == "/login" && localStorage.getItem("authToken") != null) {
        return {
            path: '/'
        }
    }
    return true;
};