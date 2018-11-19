<template>
    <div class="c-third-menus">
        <div class="Breadcrumb-wrapper" v-show="$store.state.PageHeaderInfo.BreadcrumbFlag">
           <Breadcrumb >
                <!--面包屑中的数据 有path渲染成可点击的-->
                <BreadcrumbItem v-for="(val, idx) in breadcrumbList" :key="idx">
                    <router-link
                                :to="{name: val.name}"
                                :key="idx"
                                v-if="val.name"
                    >
                        {{val.title}}
                    </router-link>
                    <!--没有path 渲染成普通的文本-->
                    <span v-else>
                        {{val.title}}
                    </span>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
        <Tabs :animated="false" @on-click="onTabClick" :value="$store.state.CurrentThirdItemName">
            <TabPane :label="item.title" :name="item.name" v-for="(item, index) in ThirdMenusList" :key="index" ></TabPane>
        </Tabs>
    </div>
</template>
<script>
export default {
  computed: {
    breadcrumbList () {
      return this.$store.state.PageHeaderInfo.BreadcrumbList
    },
    ThirdMenusList () {
      return this.$store.state.PageHeaderInfo.ThirdMenusList
    }
  },
  methods: {
    onTabClick (name) {
      this.$router.push({name})
    }
  }
}
</script>

<style lang="less" scoped>
.c-third-menus{
  height: 48px;
  display: flex;
  padding: 0 16px;
  box-sizing: border-box;
//   align-items: center;
  background-color: #fff;
  border-bottom: 1px solid rgba(153, 153, 153, .2);
  .Breadcrumb-wrapper{
    line-height: 48px;
  }
}
</style>
