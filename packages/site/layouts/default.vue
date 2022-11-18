<template>
  <div class="flex flex-col w-full min-h-screen">
    <div class="p-6 min-h-screen bg-stone-200 flex flex-col items-center">
      <slot />
    </div>

    <HermesFooter />
  </div>
</template>

<script setup lang="ts">

import 'katex/dist/katex.min.css';
import '@hermes-renderer/vue/style';
import 'highlight.js/styles/base16/apprentice.css';

import {useHead} from '#imports';

useHead({
  title: 'Hermes',
  htmlAttrs: {
    lang: 'en'
  },
  meta: [
    {name: 'description', content: 'My amazing site.'}
  ],
  link: [
      {rel: 'icon', href: '/logo/favicon.svg'}
  ]
});

</script>
