<template>
 <div class="c-menu-wrapper">
     <div class="c-menu">
         <div class="c-logo">
           <div class="c-icon" @click="GetMenuData('Home', true)">
             <Icon type="md-home"  />
           </div>
         </div>
         <ul class="c-menu-list">
           <li class="c-menu-item" :class="{'active-item': currentNavName === item.name}" @click="GetMenuData(item.name)" v-for="(item, index) in menuList" :key="index">
              <!-- <Icon type="md-heart" size="18"/> -->
              <span class="c-title">{{item.meta.title}}</span>
           </li>
         </ul>
    </div>
    <transition name="slide-fade">
        <ul class="c-menu-two" v-if="secondMenu.length">
            <li
            class="c-menu-item"
            :class="{'active-item': currentSecondItem === item.name}"
            v-for="(item, index) in secondMenu"
            @click="GetSecoudItemData(item)"
            :key="index">{{item.meta.title}}</li>
        </ul>
   </transition>
 </div>
</template>
<script>
export default {
  data () {
    return {
      menuList: this.$store.state.MenuList,
      currentNavName: 'Home',
      secondMenu: [],
      currentSecondItem: ''
    }
  },
  created () {
    let routeInfo = this.$route.matched
    this.currentNavName = routeInfo[0] && routeInfo[0].name
    this.currentSecondItem = routeInfo[1] && routeInfo[1].name
    this.GetSecondMenu(this.currentNavName, {NoGetSecond: true})
  },
  methods: {
    // 跳转一级菜单
    GetMenuData (name) {
      this.currentNavName = name
      this.$router.push({name: name})
      this.GetSecondMenu(name)
    },
    // 点击二级菜单的数据
    GetSecoudItemData (item) {
      this.currentSecondItem = item.name
      this.$router.push({name: item.name})
    },
    // 获取二级菜单是数据
    GetSecondMenu (name, ops) {
      let item = this.menuList.find(item => {
        return item.name === name
      })
      if (item) {
        let childrenList = item.children
        this.secondMenu = childrenList && childrenList.length > 1 ? childrenList : []
        this.$emit('onSecondMenuFlag', {flag: this.secondMenu.length})
        if (ops && ops.NoGetSecond) return
        let firstItem = this.secondMenu[0]
        this.currentSecondItem = firstItem && firstItem.name
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
      &.active-item{
        color: #2d8cf0;
      }
    }
  }
}
::-webkit-scrollbar{
  width: 1px;
  height: 0px;
  background-color: #fff;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track{
  border-radius: 50px;
  background-color: #fff;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb{
  border-radius: 50px;
  background-color: #fff;
  margin-right:2px;
}
.c-menu{
    position: absolute;
    top: 0;
    left: 0;
    overflow-y: scroll;
    width: 180px;
    height: 100vh;
    background: #001529;
    z-index: 1;
    .c-menu-list{
      width: 100%;
      .c-menu-item{
        height: 48px;
        display: flex;
        align-items: center;
        padding-left: 16px;
        box-sizing: border-box;
        width: 100%;
        color: #f4f4f4;
        transition: all .3s;
        cursor: pointer;
        .c-title{
          margin-left: 14px;
        }
        &:hover{
          color: #fff;
          background-color: rgba(157, 175, 192, 0.8);
        }
        &.active-item{
          color: #2d8cf0;
          background-color: #fff;
        }
      }
    }
    .c-logo{
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 0;
      font-size: 26px;
      .c-icon{
        width: 40px;
        height: 40px;
        color: #2d8cf0;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        cursor: pointer;
      }
    }
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
