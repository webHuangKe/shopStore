<template>
    <div class="c-main">
        <div class="c-menu-main" :class="{'showSecond': ShowFlag, 'hideSecond':!ShowFlag}">
           <CommonMenu @onSecondMenuFlag="onSecondMenuFlag"></CommonMenu>
        </div>
        <div class="c-content-main" >
            <router-view/>
        </div>
    </div>
</template>
<script>
import CommonMenu from '@/components/common/Menu/CommonMenu'
export default {
  data () {
    return {
      ShowFlag: false
    }
  },
  components: {
    CommonMenu
  },
  methods: {
    onSecondMenuFlag (data) {
      this.ShowFlag = data.flag
    }
  }
}
</script>
<style lang="less" scoped>
.c-main{
    display: flex;
    .c-menu-main{
        position: relative;
        transition: width .3s;
        &.showSecond{
            width: 280px;
        }
        &.hideSecond{
            width: 180px;
        }
    }
    .c-content-main{
        flex: 1;
        min-height: 100%;
        background-color: #f8f8f8;
    }
}
</style>
