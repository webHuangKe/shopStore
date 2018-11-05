<template>
    <div class="c-main-content">
        <ThirdMenus></ThirdMenus>
        <div class="c-content-t">
            <router-view/>
        </div>
    </div>
</template>

<script>
import ThirdMenus from '@/components/common/Menu/ThirdMenus'
export default {
  components: {
    ThirdMenus
  }
}
</script>

<style scoped lang="less">
.c-main-content{
  height: 100%;
}
 .c-content-t{
    margin: 16px 16px;
    position: relative;
    box-sizing: border-box;
    height: calc(100% - 80px);
    overflow-x: auto;
    background-color: #fff;
}
</style>
