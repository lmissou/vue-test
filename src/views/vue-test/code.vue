<template>
  <div class="test-wrap">
    <button type="button" @click="handleClick">
      {{ val }}
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

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
