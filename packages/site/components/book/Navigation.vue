<template>
  <NavigationDrawer fixed>
    <ol>
      <!-- For Each Chapter... -->
      <template v-for="n in props.chapters.length" :key="n">
        <!-- Print Out The Chapter Index -->
        <li class="ml-2">
          <button @click="$emit('active', [props.chapters[n-1].slug, 'index'])">
            <strong class="mr-2">{{ n }}</strong>
            {{ props.chapters[n - 1].name }}
          </button>
        </li>

        <!-- Print Out The Sections -->
        <template v-for="k in props.chapters[n-1].sections.length" :key="k">
          <li v-if="props.chapters[n-1].sections[k-1].slug !== 'index'" class="ml-4">
            <button @click="$emit('active', [props.chapters[n-1].slug, props.chapters[n-1].sections[k-1].slug])">
              <strong class="mr-2">{{ n }}.{{ k }}</strong>
              {{ props.chapters[n - 1].sections[k - 1].name }}
            </button>
          </li>
        </template>
      </template>
    </ol>
  </NavigationDrawer>
</template>

<script setup lang="ts">

import {Chapter} from '~/modules/book';

import NavigationDrawer from './../navigation/Drawer.vue';

interface BookProps {
  chapters: Chapter[],
  active?: [string, string]
}

defineEmits(['active']);

const props = withDefaults(defineProps<BookProps>(), {
  chapters: () => [],
  active: undefined
});

// function isActive(c: Chapter, s: Section){
//   if(!props.active)
//     return false;
//   return props.active[0] === c.slug && props.active[1] === s.slug;
// }

</script>
