<template>
  <div class="hermes-error">
    {{ props.error }}
  </div>
</template>

<script setup lang="ts">

interface ErrorProps {
  error: unknown,
}

const props = withDefaults(defineProps<ErrorProps>(), {
});

</script>

<style>

.hermes-error {
  background-color: darkred;
  padding: 0.5rem;
  border-radius: 4px;
  font-weight: bold;
}

</style>
