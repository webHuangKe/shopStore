<template>
    <div class="wrapper">
      <!-- 产品搜索 s -->
      <Form ref="formValidate" :model="formInfo"  inline>
        <FormItem >
          <Input placeholder="请输入商品名称" v-model="formInfo.content"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
        </FormItem>
      </Form>
      <!-- 产品搜索 e -->
      <Button type="primary" @click="goAddProduct">添加产品</Button>
      <div class="c-table-wrapper">
        <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        <div class="c-page-wrapper">
          <Button @click="handleSelectAll(true)">全选</Button>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      formInfo: {
        content: ''
      },
      columns4: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '商品名称',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    handleSubmit (key) {

    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    goAddProduct () {
      this.$router.push({name: 'AddProduct'})
    }
  }
}
</script>

<style lang="less" scoped>

</style>
