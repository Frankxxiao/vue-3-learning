<template>
  <div id="app">
    <p>Upper: {{ upperName }} out of {{ name }}</p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      name: "author",
    }
  },
  computed: {
    upperName(){
      return this.name.toUpperCase() + "VUE_2";
    }
  }
};
</script>