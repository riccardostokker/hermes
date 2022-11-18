<template>
  <div>
    <!-- Mobile Navigation Bar -->
    <div class="fixed md:hidden top-0 left-0 w-full h-12 flex flex-row justify-between items-center py-2 px-4 bg-stone-300">
      <client-only>
        <button
          @click="drawer = !drawer"
        >
          <font-awesome-icon
            icon="fa-solid fa-bars"
            class="text-emerald-600"
          />
        </button>
      </client-only>

      <div class="h-full flex flex-row gap-2 justify-between items-center">
        <h1 class="text-emerald-600 text-2xl font-lobster">
          {{ drawer }}
        </h1>
        <img
          src="/logo/logo.svg"
          class="h-full w-auto"
        >
      </div>
    </div>

    <!-- Overlay -->
    <div
      v-if="drawer"
      :class="{
        'absolute left-0 top-0 h-full w-full bg-gray-900 opacity-40': true,
      }"
      @click="drawer = false"
    />

    <!-- Drawer -->
    <aside
      :class="{
        'fixed left-0 top-0 w-3/4 h-screen bg-slate-400': true,
        'md:block md:w-1/6': props.fixed,
        'hidden': !drawer
      }"
    >
      <slot />
    </aside>
  </div>
</template>

<script setup lang="ts">

import {ref} from 'vue';

interface NavigationProps {
  /**
   * If true, the drawer will render as a fixed element to the left of the screen (like in a Book) on large screens.
   */
  fixed: boolean
}

const props = withDefaults(defineProps<NavigationProps>(), {
  fixed: false
});

const drawer = ref(false);

</script>
