# Hermes

![Hermes At Work](https://camo.githubusercontent.com/1e0c6688ac7f106cefa28b40221076bef2e85722cde25d75b75b2d536f08dff3/68747470733a2f2f692e696d6775722e636f6d2f776349424563492e676966)

_Hermes_ is a framework of different packages which will allow you to write
extended Markdown code and render it as a Vue component (and PDF file in the future).
The renderer can be extended in a relatively painless way, which allows you to 
use your own components in your Markdown code, or to do more exotic things like
sending you a Telegram message every time a 'hello' word appears in a document.
Just throwing ideas out there.

The renderer can be extended in a relatively painless way. You can
choose how each 'text', 'paragraph' or 'heading' will be rendered.
All the default renderers are included in the default configuration.

All the library modules in the framework are _ESM_ modules, which means
that they support tree-shaking, which in turn means that you will only
import what you need from the libraries, minimizing the final bundle size.

# Where To Ask For Support
You can ask for support on the official [Discord server](https://discord.gg/m455dgsq52).

[![Discord Button](https://i.imgur.com/3RZUulJ.png)](https://discord.gg/m455dgsq52)

This is currently the best way to ask for help since the library in its current 
state is highly experimental and detailed documentation has yet to be written.

# Getting Started

In order to start using the Vue renderer, first install the `@hermes-renderer/vue`
package:

```
pnpm i -D @hermes-renderer/vue
```

```
npm i -D @hermes-renderer/vue
```

```
yarn add -D @hermes-renderer/vue
```

Then add the Vue component to your instance using the provided Vue plugin:

```typescript
import {VuePlugin} from '@hermes-renderer/vue';
[...]
app.use(VuePlugin, {});
```

If you're using Nuxt, you can register the component using a plugin, like so:

```typescript
import {VuePlugin} from '@hermes-renderer/vue';
import {defineNuxtPlugin} from '#imports';

export default defineNuxtPlugin((NuxtApp) => {
    NuxtApp.vueApp.use(VuePlugin, {});
});
```

This will make the `HermesRenderer` component globally available.
You can now use it in this way:

```html
<hermes-renderer
    class="my-custom-class"
    :configuration="config"
    :source="source"
    @load="load = $event"
/>

<script setup lang="ts">
    
// Important! You have to import the Hermes, Katex and Highlight.js styles that you want to use
import '@hermes-renderer/vue/style';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/base16/apprentice.css';
    
import {Configurations} from '@hermes-renderer/vue';
import {Ref, ref} from 'vue';

const config = Configurations.Default();
const source = ref('Hello World!');
</script>

```

It's important to pass a configuration prop or the component won't work.


**Note:** Currently the Hermes default configuration uses TailwindCSS styles.
A styles-only configuration is currently in the works.

If you're using TailwindCSS you need to add the hermes styles to the Tailwind
configuration:
```typescript
const config: Config = {
    content: [
        './node_modules/@hermes-renderer/vue/src/library/theme/**/*',
        './node_modules/@hermes-renderer/book/src/library/theme/**/*',
        [...]
    ]
};
```

That's it! You should now have a working renderer on your page.

# A Little Disclaimer
So far I am the only contributor to this library. I am a mechatronics engineer
and not a web developer, so I will welcome any help in the development of
this project with open arms.

# The long road to 1.0.0 ...

With every version before _1.0.0_ the internal API and methods of the library might change.
Keep up to date with the release notes.
The good news is that every new minor and major patch will bring improvements, new components and new features to the library.

Here are some of the milestones to reach before reaching version _1.0.0_:

- `core`: An extendable core architecture that supports the different renderers.
- `vue`: An extendable Vue renderer with support for rendering both vanilla Markdown and components.
- `editor`: A Vue Component that will allow convenient editing of the source code of your Markdown code snippets.
- `pdf`: A PDF renderer that will allow you to render your Markdown code to a PDF file.
- `directus`: A directus extension that will allow you to make use of the powerful editor features directly in your Directus dashboard.

Got any other ideas? You're welcome to let us know!


