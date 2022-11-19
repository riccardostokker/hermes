<template>
  <div class="grid grid-cols-2 gap-3">
    <div class="rounded bg-slate-700 p-3 h-96">
      <textarea
        v-model="source"
        class="outline-none resize-none w-full h-full p-2 rounded font-mono text-xs"
      />
    </div>

    <div class="rounded bg-slate-700 p-3 h-96">
      <hermes-renderer
        class="h-full bg-slate-700"
        :configuration="config"
        :source="source"
        @load="load = $event"
      />
    </div>

    <RenderingStats
      class="col-span-2"
      :time="load ? load.time : 0"
    />
  </div>
</template>

<script lang="ts" setup>

import {HermesRenderer, Configurations} from '@hermes-renderer/vue';
import {ConcreteComponent, Ref, ref} from 'vue';
import RenderingStats from './RenderingStats.vue';

const initial = await import('./initial.md?raw');

const config = Configurations.Default();
const source = ref(initial.default);
const load: Ref<unknown> = ref(undefined);

import Dummy from './Dummy.vue';

config.components = {
  dummy: Dummy as ConcreteComponent
};

</script>
