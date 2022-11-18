import {ConfigurationFactory} from '@hermes-renderer/core';
import {App} from 'vue';
import HermesRenderer from './library/components/HermesRenderer.vue';

export {default as HermesRenderer} from './library/components/HermesRenderer.vue';

// Export Configuration
import {default as ProcessorConfiguration} from './core/Configuration';

export type Configuration = ProcessorConfiguration;

export {default as Configurations} from './library/configuration';

// Export Theme
import {default as ProcessorTheme} from './core/Theme';
export type Theme = ProcessorTheme;
export {default as Themes} from './library/theme';

import {Plugin} from 'vue';

export const VuePlugin: Plugin = {
    install(app: App) {
        app.component('HermesRenderer', HermesRenderer);
    }
};

export {default as ProcessorPlugin} from './core/VuePlugin';
