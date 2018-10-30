<template>
 <div class="c-menu">
   <Menu :theme="theme3" active-name="1" width="180">
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-analytics" />
                首页
            </template>
            <MenuItem name="1-1">Option 1</MenuItem>
            <MenuItem name="1-2">Option 2</MenuItem>
            <MenuItem name="1-3">Option 3</MenuItem>
            <MenuItem name="1-4">Option 4</MenuItem>
        </Submenu>
        <MenuGroup title="统计分析">
            <MenuItem name="3">
                <Icon type="md-heart" />
                用户留存
            </MenuItem>
            <MenuItem name="4">
                <Icon type="md-leaf" />
                流失用户
            </MenuItem>
        </MenuGroup>
    </Menu>
 </div>
</template>
<script>
export default {
  data () {
    return {
      theme3: 'dark'
    }
  }
}
</script>
<style lang="less" scoped>
.c-menu{
    height: 100vh;
    width: 180px;
    background: #515a6e;
    overflow-y: scroll;
    box-sizing: border-box;
}
</style>
