<template>
  <div>
    <h1 class="text-4xl font-bold">
      {{ front.title }}
    </h1>

    <div
      v-if="front.updated"
      class="flex flex-row justify-start items-center"
    >
      <p class="my-1">
        Updated: {{ front.updated }}
      </p>
    </div>

    <hermes-renderer
      class="mt-4"
      :configuration="rendererConfiguration"
      :source="props.section.source"
      @front="front = $event"
      @load="$emit('loaded', true)"
    />
  </div>
</template>

<script setup lang="ts">

import {getDefaultConfiguration} from '@hermes-renderer/vue';
import {ref} from 'vue';
import {Section} from '~/modules/book';

const rendererConfiguration = getDefaultConfiguration();
rendererConfiguration.theme.container = {
  classes: [
    'bg-transparent',
    'w-full'
  ]
};

const emit = defineEmits(['loaded']);

const front = ref({});

interface BookProps {
  section: Section
}

const props = defineProps<BookProps>();

</script>
