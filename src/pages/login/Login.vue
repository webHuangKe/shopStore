<template>
    <div class="login-wrapper">
       <div class="login-main">
           <div class="login-header">
               <div class="c-login c-content-center">
                   xxx后台管理系统
               </div>
               <div class="login-tab">
                   <div class="login-item c-content-center " @click="changeCurrentItem(0)" :class="{'active': currentItem === 0}">登录</div>
                   <div class="login-item c-content-center" @click="changeCurrentItem(1)" :class="{'active': currentItem === 1}">注册</div>
               </div>
           </div>
           <div>
              <Register width="200" v-show="currentItem === 0"></Register>
              <SignIn width="200" v-show="currentItem === 1"></SignIn>
           </div>
       </div>
    </div>
</template>
<script>
  import Register from './Register'
  import SignIn from './SignIn'
    export default {
        data () {
            return {
              currentItem: 0
            }
        },
        methods: {
            changeCurrentItem(index) {
              this.currentItem = index  
            }
        },
        components: {
            Register,
            SignIn
        }
    }
</script>
<style lang="less" scoped>
.login-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    .login-main{
        width: 500px;
        border: 1px solid #999;
        padding: 0 20px;
        border-radius: 10px;
        .login-tab{
            display: flex;
            width: 100%;
            margin-bottom: 20px;
            border-bottom: 1px solid #666;
            .login-item{
                flex: 1;
                height: 48px;
                cursor: pointer;
                &.active, &:hover{
                    position: relative;
                    color: #2d8cf0;
                    &::before{
                       content: '';
                       position: absolute;
                       bottom: -1px;
                       width: 100px;
                       height: 3px;
                       z-index: 1;
                       background-color: #2d8cf0;
                    }
                }
            }
        }
    }
    .c-login{
       height: 50px;
       font-size: 20px;
       font-weight: bold;
    }
}
</style>

