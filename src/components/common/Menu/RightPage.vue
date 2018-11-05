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
    box-sizing: border-box;
    min-height: calc(100% - 80px);
    background-color: #fff;
}
</style>
