<template>
  <main class="w-full">
    <Suspense>
      <HermesBook
        :chapters="chapters"
        :active="active"
      />
    </Suspense>
  </main>
</template>

<script setup lang="ts">

import {definePageMeta} from '#imports';
import {ref} from 'vue';

definePageMeta({
  layout: 'docs'
});

const active = ref('getting-started/index');

import chapters from '~/books/docs/Book';

</script>
