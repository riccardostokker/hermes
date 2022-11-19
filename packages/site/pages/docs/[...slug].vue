<template>
  <div
    v-if="book"
    class="w-full h-full"
  >
    <BookNavigation
      :chapters="book.chapters"
      @active="setActive"
    />
    <div class="absolute top-0 right-0 w-5/6 p-4">
      <Suspense v-if="section">
        <BookRenderer
          :section="section"
        />
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">

import {BookRenderer} from '#components';
import {createError, definePageMeta, navigateTo, useFetch, useRoute} from '#imports';
import {Ref, ref, watch} from 'vue';
import {Section} from '~/modules/book';

definePageMeta({
  layout: 'docs'
});

const book: Ref<Record<string, unknown> | undefined> = ref(undefined);
const section: Ref<Section | undefined> = ref(undefined);
const active: Ref<[string, string]> = ref(['getting-started', 'index'] as [string, string]);
const route = useRoute();

/* #### Utility Functions #### */

async function updateBook() {
  const bookData = await useFetch('/api/books/docs');
  book.value = bookData.data.value;
}

function updateActive() {
  const split = route.path.replace('/docs/', '').split('/');
  const chapter = split[0];
  if (!chapter)
    throw createError({statusCode: 404, statusMessage: 'Chapter Not Found'});
  const section = split[1] || 'index';
  if (!section)
    throw createError({statusCode: 404, statusMessage: 'Section Not Found'});
  active.value = [chapter, section];
  console.log('New Active: ', active);
}

async function updateSection(active: [string, string]) {
  console.log('Updating section...', active);
  console.log('Path: ', `/api/books/docs/${active[0]}/${active[1]}`);
  const sectionData = await useFetch(`/api/books/docs/${active[0]}/${active[1]}`);
  console.log('SectionData: ', sectionData.data);
  section.value = sectionData.data.value as Section;
  console.log('New Section: ', section.value?.slug);
}

function setActive(a: [string, string]){
  return navigateTo({
    path: `/docs/${a[0]}/${a[1]}`
  });
}

watch(active, updateSection);

watch(route, () => {
  console.log('Route changed');
});

/* #### One-Shot Functions #### */
updateBook();
updateActive();
updateSection(active.value);

</script>
