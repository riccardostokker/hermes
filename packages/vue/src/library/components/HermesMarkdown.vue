<template>
  <component
    :is="component"
    v-if="component"
    class="hermes-markdown"
  />
</template>

<script setup lang="ts">

import {MarkdownProcessor, ProcessorPlugin} from '@hermes-renderer/core';

// Imports
import {Debugger} from 'debug';

// Components
import {reactive, Ref, ref, VNode, watch} from 'vue';
import Configuration from '../../core/Configuration';
import {Plugins} from '@hermes-renderer/core';
import VuePlugin from '../../core/VuePlugin';

// Emits
const emit = defineEmits(['error', 'front', 'load']);

/*
 * Props breakdown:
 * - debug: A debugger in case you want to overwrite the default one
 * - configuration: A configuration, in the likely case that you want to overwrite the default one
 * - source: the Markdown source code
 */
const props = defineProps<{
  source: string,
  context: Record<string, unknown>,
  configuration: Configuration<Record<string, unknown>>,
  plugins: (new (d?: Debugger) => ProcessorPlugin)[],
  debug: Debugger
}>();

/* #### Component State #### */
const configuration = reactive(props.configuration);
const context = reactive(props.context);
const plugins = reactive(props.plugins);
const component: Ref<VNode | undefined> = ref(undefined);

/* #### Update Function #### */
async function update() {
  try {

    const start = performance.now();
    /*
     * Create and initialize the processor that will be used in order to load and render the Markdown data.
     * Passing an undefined configuration to the constructor will cause the Processor to load its default configuration.
     */
    const processor = new MarkdownProcessor<VNode>(context, configuration, props.debug);

    // Register Plugins
    processor.use(Plugins.FrontMatter);
    processor.use(Plugins.Directive);
    processor.use(Plugins.Math);
    processor.use(VuePlugin);
    // Register User Plugins
    for (const plugin of plugins)
      processor.use(plugin);
    // Set Up Processor
    await processor.setup();

    await processor.load(props.source);
    const result = await processor.process();

    // If a front matter was loaded, pass it up
    const front = processor.getContext().front;
    if (front) {
      emit('front', front as Record<string, unknown>);
    }

    component.value = undefined;
    component.value = result;

    const end = performance.now();

    emit('load', {
      time: end - start
    });

  } catch (err) {
    console.log('Error: ', err);
    emit('error', err);
  }
}

/* #### Watchers #### */
watch([
    () => props.source, configuration
], update);

/* #### Single-Fire Functions #### */
update();

</script>

<style>

.hermes-markdown li p {
  display: inline;
}

</style>
