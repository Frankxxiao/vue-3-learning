<template>
  <div id="app">
    <h2>{{foo}}</h2>
    <h2>{{bar}}</h2>
  </div>
</template>

<script>
import {ref, watchEffect, computed} from 'vue';
  export default {
    // composition API 可以和 option API 一起使用
    setup() {
      let foo = ref(123)
      const fooMultiple = computed(() => foo.value * 2)
      // 响应式函数的副作用
      watchEffect(()=>{
        console.log("the effect of foo : ", foo.value);
        // computed 返回的也是 ref 格式的数据
        console.log("the effect of fooMultiple : ", fooMultiple.value);
      })
      setInterval(()=>{foo.value++}, 1000);
      return {foo}
    },
    data() {
      return {
        bar: '123456 from the normal data'
      }
    },
  }
</script>

<style scoped>

</style>