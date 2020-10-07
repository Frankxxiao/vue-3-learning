<template>
  <div>
    <div>Amount: {{ amount }}</div>
    <button @click="increaseAmount()">Increase Capacity</button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      amount: 3,
    }
  },
  methods: {
    increaseAmount() {
      this.amount+=1
    }
  }
};
</script>