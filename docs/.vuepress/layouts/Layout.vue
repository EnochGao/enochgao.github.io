<script setup lang="ts">
import { onUnmounted, onMounted, ref } from 'vue';
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
import { useReadingTimeLocale } from 'vuepress-plugin-reading-time2/client';

const isDarkMode = ref(false);
const readingTimeLocale = useReadingTimeLocale();
onMounted(() => {
  const html = document.documentElement;

  isDarkMode.value = html.classList.contains('dark');

  // watch theme change
  const observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains('dark');
  });

  observer.observe(html, {
    attributeFilter: ['class'],
    attributes: true,
  });

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>

<template>
  <ParentLayout>
    <template #page-content-top>
      <h7>{{ readingTimeLocale.words }}， {{ readingTimeLocale.time }}</h7>
    </template>
    <template #page-bottom>
      <CommentService :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
