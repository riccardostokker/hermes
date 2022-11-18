<template>
  <div class="w-full h-screen bg-stone-200 p-4">
    <div class="flex flex-row justify-between items-center mb-3">
      <h1 class="text-4xl">
        Hermes Renderer
      </h1>
      <h6 class="text-xl italic">
        Test Page
      </h6>
    </div>

    <Suspense>
      <slot />
    </Suspense>
  </div>
</template>

<script setup lang="ts">

import '@hermes-renderer/vue/style';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/base16/apprentice.css';

</script>

<style lang="scss">

@tailwind base;
@tailwind components;
@tailwind utilities;

</style>
