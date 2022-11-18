<template>
  <div class="rounded p-3 bg-slate-700 text-white grid gap-3 grid-cols-2">
    <div class="flex flex-row items-center justify-between">
      <h6>Rendering Time: </h6>
      <span class="font-mono">{{ Math.round(props.time * 100) / 100 }}ms</span>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  time: number
}

const props = withDefaults(defineProps<Props>(),{
  time: 0
});

</script>
