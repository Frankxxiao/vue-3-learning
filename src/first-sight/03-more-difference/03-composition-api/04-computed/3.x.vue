<template>
  <div id="app">
    <p>Upper: {{ upperName }} out of {{ name }}</p>
  </div>
</template>
<script>
import { ref, computed } from "vue";
export default {
  setup() {
    const name = ref("author");
    // 通过内置响应式函数来实现
    const upperName = computed(() => {
      return name.value.toUpperCase() + "VUE_3";
    });
    return { name, upperName };
  }
};
</script>