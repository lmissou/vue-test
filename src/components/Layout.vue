<script setup lang="ts">
import { ref } from 'vue';
import { ElAside, ElContainer, ElHeader, ElMain } from 'element-plus';

const asideCollapse = ref(false);
function handleAsideCollapse() {
  asideCollapse.value = !asideCollapse.value;
}
</script>

<template>
  <ElContainer>
    <ElHeader>header</ElHeader>
    <ElContainer class="bg-[#f3f3f3]">
      <ElAside :width="asideCollapse ? '0' : '200px'" class="flex flex-col">
        <slot name="aside" />
        <div
          class="absolute top-[50%] rounded-r-md bg-white cursor-pointer"
          :style="{ left: asideCollapse ? '-2px' : '198px' }"
          @click="handleAsideCollapse"
        >
          >
        </div>
      </ElAside>
      <ElMain class="flex! flex-col p-0! m-3 rounded-md bg-white">
        <slot name="default" />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>
