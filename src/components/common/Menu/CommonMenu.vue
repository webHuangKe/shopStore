<template>
 <div class="c-menu-wrapper">
     <div class="c-menu">
         <Menu :theme="theme3" :active-name="currentNavName" width="180" @on-select="GetMenuData">
            <MenuItem :name="item.name" v-for="(item, index) in menuList" :key="index">
                <Icon type="md-heart" />
                {{item.title}}
            </MenuItem>
        </Menu>
    </div>
    <transition name="slide-fade">
        <ul class="c-menu-two" v-if="secondMenu.length">
            <li class="c-menu-item" v-for="(item, index) in secondMenu" :key="index">{{item.title}}</li>
        </ul>
   </transition>
 </div>
</template>
<script>
import routes from '@/router/router'
export default {
  data () {
    return {
      theme3: 'dark',
      menuList: routes,
      currentNavName: 'Home',
      secondMenu: []
    }
  },
  created () {
    console.log(this.$route, 'sss')
    this.currentNavName = this.$route.matched[0].name
    this.GetSecondMenu(this.currentNavName)
  },
  methods: {
    GetMenuData (name) {
      this.$router.push({name: name})
      this.GetSecondMenu(name)
    },
    GetSecondMenu (name) {
      let item = routes.find(item => {
        return item.name === name
      })
      if (item) {
        let childrenList = item.children
        this.secondMenu = childrenList && childrenList.length > 1 ? childrenList : []
        this.$emit('onSecondMenuFlag', {flag: this.secondMenu.length})
      }
    }
  }
}
</script>
<style lang="less" scoped>
.c-menu-wrapper{
  display: flex;
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  padding-left: 180px;
  .c-menu-two{
    padding-top: 30px;
    width: 100px;
    background-color: #fff;
    border-right: 1px solid rgba(153, 153, 153, .2);
    .c-menu-item{
      padding: 10px 0;
      text-align: center;
      cursor: pointer;
      &:hover{
          background-color: #f4f4f4;
          color: #2d8cf0;
      }
    }
  }
}
.c-menu{
    position: absolute;
    top: 0;
    left: 0;
    overflow-y: scroll;
    width: 180px;
    height: 100vh;
    background: #001529;
    overflow: hidden;
    z-index: 1;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(-100px);
  opacity: 0;
}
</style>
