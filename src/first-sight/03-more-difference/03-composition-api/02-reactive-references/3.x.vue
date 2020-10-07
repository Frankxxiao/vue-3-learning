<template>
  <div>Name: {{ name }}</div>
</template>
<script>
import { ref } from "vue";
export default {
  // 响应式的应用，可以替代 vue 2.x 的 data 选项
  // 不过对于混合使用的说法，依然感到有些困惑
  // 如何在 setup 的其他属性（props / mounted）使用这些响应式的 data 呢？
  // 看设计，这个 setup 的完美使用，是需要牺牲掉其他（props / mounted）的
  // 或者说，在外部的其他属性，都可以通过 reactivity API 中的对应选项做替代
  setup() {
    const name = ref('Name');
    return { name };
  }
};
</script>