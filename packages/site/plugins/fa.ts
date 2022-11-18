import {defineNuxtPlugin} from '#imports';

/* import the fontawesome core */
import { library, config } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

config.autoAddCss = false;

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(fas);

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
});
