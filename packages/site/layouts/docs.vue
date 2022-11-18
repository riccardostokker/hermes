<template>
  <slot />
</template>

<script setup lang="ts">

import 'katex/dist/katex.min.css';
import '@hermes-renderer/vue/style';
import 'highlight.js/styles/base16/apprentice.css';

import {useHead} from '#imports';

useHead({
  title: 'Hermes - Documentation',
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
