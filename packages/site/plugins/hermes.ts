import {VuePlugin} from '@hermes-renderer/vue';
import {defineNuxtPlugin} from '#imports';

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.vueApp.use(VuePlugin);
});
