<template>
  <div class="w-full flex flex-col items-center">
    <div class="flex flex-col items-center w-full pb-6">
      <img
        src="/logo/logo.svg"
        class="h-48 md:h-64 pb-6"
      >
    </div>

    <HermesRenderer
      class="text-center w-full"
      :source="intro"
      :configuration="configuration"
    />

    <HermesRenderer
      class="bg-slate-800 rounded text-white w-full p-4 my-3 min-h-screen"
      :source="tryRenderer"
      :configuration="configuration"
    />

    <div class="flex flex-col md:flex-row w-full gap-3">
      <HermesRenderer
        class="w-full p-3"
        :source="gettingStarted"
        :configuration="configuration"
      />

      <HermesRenderer
        class="w-full rounded p-3"
        :source="disclaimer"
        :configuration="configuration"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

import {getDefaultConfiguration} from '@hermes-renderer/vue';
import {ref} from 'vue';

const configuration = getDefaultConfiguration();

const lazyLoadSnippet = async (path: string) => {
  return (await import(`~/markdown/snippets/${path}.md?raw`)).default;
};

import {HermesPreview} from '#components';
configuration.components['hermes-preview'] = HermesPreview;

const intro = ref(await lazyLoadSnippet('intro'));
const disclaimer = ref(await lazyLoadSnippet('disclaimer'));
const gettingStarted = ref(await lazyLoadSnippet('getting-started'));
const tryRenderer = ref(await lazyLoadSnippet('try'));


</script>
