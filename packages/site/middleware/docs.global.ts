import {defineNuxtRouteMiddleware, navigateTo} from '#imports';

export default defineNuxtRouteMiddleware((to) => {
    if (to.path.endsWith('/docs')) {
        return navigateTo('/docs/getting-started/index');
    }
});
