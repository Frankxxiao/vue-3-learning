<template>
  <div>
    <input type="text" v-model="name" />
  </div>
</template>

<script>
import { ref, watchEffect, watch } from "vue";
export default {
  setup() {
    const name = ref('');
    // 1.修改为 watchEffect 这个内置响应式函数来替代
    watchEffect(() => {
      console.log(name.value);
    })
    // 2.另一种同样的方案，同样的watch API 实现
    watch(name, (newVal, oldVal) => {
      console.log(`${newVal} ${oldVal}`);
    })
    return { name };
  }
};
</script>