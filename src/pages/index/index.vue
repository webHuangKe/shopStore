<template>
    <div class="c-main">
        <div class="c-menu-main">
           <CommonMenu></CommonMenu>
        </div>
    </div>
</template>
<script>
import CommonMenu from '@/components/common/Menu/CommonMenu'
export default {
  components: {
    CommonMenu
  }
}
</script>
<style lang="less" scoped>
.c-main{
    display: flex;
    .c-menu-main{

    }
}
</style>
