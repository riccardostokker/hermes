<template>
  <div class="w-full">
    <book-navigation
      :chapters="props.chapters"
      :active="current"
      @select="changePage"
    />
    <div class="w-full md:w-5/6 absolute right-0 top-12 md:top-0">
      <book-renderer
        class="w-full min-h-screen p-4 bg-stone-100"
        :chapters="props.chapters"
        :active="current"
      />
      <hermes-footer />
    </div>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from '#imports';
import {ref} from 'vue';
import {Chapter} from '~/types/Book';

interface BookProps {
  chapters: Chapter[],
  active?: string
}

const props = withDefaults(defineProps<BookProps>(), {
  chapters: () => [],
  active: undefined
});

const current = ref(props.active);
const router = useRouter();

function changePage(to: string){
  current.value = to;
  router.push({
    path: `/docs/${to}`
  });
}

</script>
