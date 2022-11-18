
## :emerald[Getting Started]

Starting to use this renderer is relatively painless. If you've set 
up a Webpack configuration for a library during your life, you'll find
this relatively easy.

Begin by installing the package like any other package:

```text
npm install -D @hermes-renderer/core
```

```text
yarn add -D @hermes-renderer/core
```

You then will have to import and add the Vue plugin to enable the renderer:

```typescript
import {VuePlugin} from "packages/core/dist/types/index";

...
vueApp.use(VuePlugin);
```
Include styles from the renderer and katex:
```typescript
import 'katex/dist/katex.min.css';
import '@hermes-renderer/core/style';
```
After that, you will be able to use the renderer element:
```text
<HermesRenderer
  :source="disclaimer"
  :configuration="config"
/>
```

The `source` prop is your Markdown code, as a string.
It can come from a database, an imported file, whatever you want.

The `options` prop is harder to explain quickly. It allows you to
customize _everything_! From how `<li>` elements are rendered, to
how the `::math[]` directive will behave, to the classes will 
be applied to a `<p>` element.

To learn how this object is structured and how to customize the renderer,
check out the [playground](https://gitlab.com/hermes-renderer/core/-/tree/main/playground).

The readme in the playground is currently the most complete documentation for the module.
