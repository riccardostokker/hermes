<template>
  <div class="bg-red-800 rounded p-2">
    <p>Here is our dummy component. Below we have what you inserted in the body of the component:</p>
    <p>Context: {{ props.context }}</p>
    <slot />
  </div>
</template>

<script setup lang="ts">

interface RenderProps {
  context: Record<string, unknown>,
}

const props = withDefaults(defineProps<RenderProps>(), {
  context: () => {return {};}
});

</script>
