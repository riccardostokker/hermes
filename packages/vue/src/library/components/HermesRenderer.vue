<template>
  <Suspense>
    <HermesMarkdown
      :source="props.source"
      :configuration="props.configuration"
      :debug="props.debug"
      :plugins="props.plugins"
      :class="props.class"
      :style="props.style"
      :context="props.context"
      @front="$emit('front', $event)"
      @error="$emit('error', $event)"
      @load="$emit('load', $event)"
    />
  </Suspense>
</template>

<script setup lang="ts">

// Imports
import logger, {Debugger} from 'debug';
import Configuration from '../../core/Configuration';

// Components
import HermesMarkdown from './HermesMarkdown.vue';
import {ProcessorPlugin} from '@hermes-renderer/core';

// Emits
const emit = defineEmits(['error', 'front', 'load']);


interface RenderProps {
  source: string,
  configuration: Configuration<Record<string, unknown>>,
  plugins?: (new (d?: Debugger) => ProcessorPlugin)[],
  context?: Record<string, unknown>,
  debug?: Debugger
  class?: string | object | Array<string>,
  style?: string | object | Array<string>,
}

const props = withDefaults(defineProps<RenderProps>(), {
  class: undefined,
  style: undefined,
  context: () => {
    return {} as Record<string, unknown>;
  },
  debug: () => logger('hermes'),
  plugins: () => []
});

/* #### Prop Checks #### */
if(!props.source)
  throw new Error('You must always specify a source string for the renderer.');

</script>

