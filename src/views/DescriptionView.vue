<script setup>
import util from '../util/utils';
</script>

<template>
  <div class="bg-[#f6f6f6] w-full h-[100vh]">
    <div class="container mx-auto py-4">
      <div class="flex flex-wrap gap-2">
        <div class="p-3 bg-white w-[48%] shadow-sm">
          <img class="w-[100%]" :src="util.getDescriptionFile('d1.jpg')" alt="d1">
        </div>
        <div class="p-3 bg-white w-[48%] shadow-sm">
          <img class="w-[100%]" :src="util.getDescriptionFile('d2.jpg')" alt="d2">
        </div>
        <div class="p-3 bg-white w-[48%] shadow-sm">
          <img class="w-[100%]" :src="util.getDescriptionFile('d3.jpg')" alt="d3">
        </div>
        <div class="p-3 bg-white w-[48%] shadow-sm">
          <img class="w-[100%]" :src="util.getDescriptionFile('d4.jpg')" alt="d4">
        </div>

      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
