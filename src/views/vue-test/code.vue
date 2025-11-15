<template>
  <div class="test-wrap">
    <NButton type="button" @click="handleClick">
      {{ val }}
    </NButton>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { NButton } from 'naive-ui';

const val = ref(1);

function handleClick() {
  val.value++;
}
</script>
<style>
.test-wrap {
  height: 100%;
  width: 100%;
  color: red;
}
</style>
