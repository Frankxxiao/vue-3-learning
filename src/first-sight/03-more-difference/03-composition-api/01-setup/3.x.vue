<template>
  <div>

  </div>
</template>

<script>
import { reactive, toRefs } from '@vue/composition-api'

export default {
  // 想要使用 composition api 需要在 setup 内部设置
  setup () {
    const state = reactive({
      count: 0,
    })
    return {
      ...toRefs(state),
    }
  },
  // 其他属性，与 vue 2.x 一致
  props: {},
  methods: {},
  beforeCreate () {},
  mounted() {}
}
</script>

<style lang="scss" scoped>

</style>