<template>
  <div>
    <div>Amount: {{ amount }}</div>
    <button @click="increaseAmount()">Increase Capacity</button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const amount = ref(3);
    // 对应的方法都需要内化到 setup 内部
    function increaseAmount() {
      amount.value+=1
    }
    return { amount, increaseAmount };
  }
};
</script>