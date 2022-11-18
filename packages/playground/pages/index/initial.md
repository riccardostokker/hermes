---
title: My MDC Implementation
test: This text is in the frontmatter
---

# :red[{{ front.title }} {{ "TEST" }}]

Right, let's see how my MDC implementation works with some use cases in this
Markdown file.

The coolest feature you have access to using this renderer is by far
custom components. A dummy component was made available to this
renderer instance using:

```typescript
import Dummy from "./preview/Dummy.vue";

const conf: Configuration = {
  components: {
    'dummy': Dummy
  }
};
```

We can now instance it using:

Emphasized: _Test_ *Test*

Strong: **Test**

Strong & Emphasized: **_Test_**

Emphasized & Strong: _**Test**_

Inline Code: `test`

Interpolation: { front.test } -> _{{ front.test }}_

Red Text: :red[Something Red!]

Unordered List:
- Item 1
- Item 2

Ordered List:
1. Item 1
2. Item 2

Link: [Install Nuxt Content](https://vuejs.org/api/application.html#app-config-globalproperties)

Relative Link: [Install Nuxt Content](/get-started)


Inline Math: $ e = m \cdot c^2 $ or $ R_W = 10 \Omega $

Math Block ($$):
$$
L = \frac{1}{2} \rho v^2 S C_L
$$

Math Block (Directive - With Tag):
:::math{tag=1}
L = \frac{1}{2} \rho v^2 S C_L
:::

Component:
::::dummy{test=something}
:::math{tag=1}
L = \frac{1}{2} \rho
:::
::::

Code Block:
```text
some code
```
