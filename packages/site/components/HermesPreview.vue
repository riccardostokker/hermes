<template>
  <div class="p-3 w-full h-screen flex flex-col lg:flex-row gap-3 bg-slate-900 rounded overflow-hidden">
    <textarea
      v-model="source"
      class="w-full h-full lg:w-1/2 grow rounded p-2 outline-none resize-none text-black"
    />

    <hermes-renderer
      class="w-full h-full lg:w-1/2 grow rounded bg-slate-800 text-white p-2 overflow-x-hidden"
      :source="source"
      :configuration="conf"
    />
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue';

import initial from './initial.md?raw';

import {getDefaultConfiguration, Configuration} from '@hermes-renderer/vue';
import Dummy from './preview/Dummy.vue';

const conf: Configuration = getDefaultConfiguration();

conf.components['dummy'] = Dummy;

const source = ref(initial);

</script>
