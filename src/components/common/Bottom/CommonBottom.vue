<template>
    <!-- 底部组件 -->
    <div class="btn-wrapper">
        <div style="height: 50px"></div>
        <div :style="{left: $store.state.IsShowSecondFlag ? 296 + 'px' : 196 + 'px'}" class="b-wrapper ">
           <Button @click="onBtn(item)" v-for="(item, index) in btnList" :key="index" type="primary" :loading="item.loading">{{item.btnName}}</Button>
        </div>
    </div>
</template>

<script>
export default {
  props: ['btnList'],
  methods: {
    onBtn (item) {
      this.$emit('onClick', item)
    }
  }
}
</script>

<style lang="less" scoped>
.btn-wrapper{
  .b-wrapper{
    position: fixed;
    border-top: 1px solid #f4f4f4;
    right: 16px;
    height: 50px;
    bottom: 0;
    display: flex;
    z-index: 99;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  }
}
</style>
