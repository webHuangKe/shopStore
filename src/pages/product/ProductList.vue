<template>
    <div class="wrapper">
      <!-- 产品搜索 s -->
      <Form ref="formValidate" :model="formInfo"  inline>
        <FormItem >
          <Input placeholder="请输入商品名称" v-model="formInfo.content" />
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">查询</Button>
        </FormItem>
      </Form>
      <!-- 产品搜索 e -->
      <Button type="primary" @click="goAddProduct">添加产品</Button>
      <div class="c-table-wrapper">
        <Table border ref="selection" :columns="columns4" :data="productList"></Table>
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
          title: '商品',
          className: 'tb-product-item',
          render: (h, params) => {
            return h('div', [
              h('img', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                attrs: {
                  src: this.commonUrl + params.row.imgItem
                },
                style: {
                  color: '#5cadff',
                  width: '60px',
                  height: '60px',
                  float: 'left',
                  margin: '0 10px 0 0'
                }
              }),
              h('div', [
                h(
                  'div',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    attrs: {
                      class: 'line-2',
                      title: params.row.gname
                    },
                    style: {
                      marginRight: '5px'
                    }
                  },
                  params.row.gname
                ),
                h(
                  'div',
                  {
                    props: {
                      type: 'text',
                      size: 'small'
                    },
                    style: {
                      color: '#ff3300',
                      marginTop: '4px'
                    },
                    on: {
                      click: () => {}
                    }
                  },
                  params.row.price ? '￥' + params.row.price : ''
                )
              ])
            ], {
              style: {
                padding: '20px 0'
              }
            })
          }
        },
        {
          title: '库存',
          key: 'reserve'
        },
        {
          title: '销量',
          key: 'salesvol'
        },
        {
          title: '状态',
          render: (h, params) => {
            return h('div', params.row.status === '1' ? '发布' : '未发布')
          }
        },
        {
          title: '排序',
          render: (h, params) => {
            return h('InputNumber', {
              props: {
                min: 0,
                max: 999,
                value: params.row.rank || 0
              }
            })
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    padding: '5px 5px 5px 0px'
                  },
                  attrs: {
                    class: 'commonHover'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name: 'UpdateProduct', query: {id: params.row.gid}})
                    }
                  }
                },
                '编辑'
              ),
              h(
                'span',
                {
                  attrs: {
                    class: 'commonHover'
                  },
                  style: {
                    marginRight: '5px',
                    cursor: 'pointer',
                    padding: '5px 5px 5px 0px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      productList: []
    }
  },
  created () {
    this.getProductList()
  },
  methods: {
    handleSubmit (key) {

    },
    handleSelectAll (status) {
      this.$refs.selection.selectAll(status)
    },
    // 跳到添加产品
    goAddProduct () {
      this.$router.push({name: 'AddProduct'})
    },
    // 获取商品列表
    getProductList () {
      this.$store.state.commonLoading = true
      this.$http.get('/productList').then(res => {
        this.$store.state.commonLoading = false
        let info = res.data
        if (info && info.success) {
          this.productList = info.productList
        } else {
          this.$Message.error(info.msg)
        }
      }).catch(err => {
        console.log(err, 'err')
        this.$store.state.commonLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
