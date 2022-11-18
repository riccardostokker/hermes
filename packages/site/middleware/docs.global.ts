import {defineNuxtRouteMiddleware, navigateTo} from '#imports';

export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path.endsWith('/docs')) {
        return navigateTo('/docs/getting-started/index');
    }
});
