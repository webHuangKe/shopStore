<template>
    <div class="wrapper">
        <Button type="primary" @click="addClass">新建分类</Button>
        <div class="c-table-wrapper">
           <Table :loading="tableLoadingFlag" :width="600" :columns="columnsTitle" :data="classProductList"></Table>
        </div>
        <Modal
            v-model="modalFlag"
            title="分类名称"
            class-name="vertical-center-modal"
            >
            <div class="modal-class-form">
               <span class="title">分类名称：</span>
               <Input v-model="modalInfo.cname" placeholder="请输入分类名称" style="width: 300px" />
            </div>
            <div slot="footer">
                <Button  :loading="modal_loading" @click="classCancel">取消</Button>
                <Button type="primary"  :loading="modal_loading" @click="classOk">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: '',
  data () {
    return {
      modalFlag: false,
      modal_loading: false,
      tableLoadingFlag: false,
      modalInfo: {
        id: 0,
        cname: ''
      },
      columnsTitle: [
        {
          title: '分类名',
          key: 'cname'
        },
        {
          title: '操作',
          width: 100,
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
                      this.modalFlag = true
                      this.modalInfo = {
                        cid: params.row.cid,
                        cname: params.row.cname
                      }
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
      ]
    }
  },
  computed: {
    ...mapState(['classProductList'])
  },
  created () {
    let classProductList = this.classProductList
    if (!classProductList || !classProductList.length) {
      this.getProductClass()
    }
  },
  methods: {
    ...mapActions(['getProductClassList']),
    addClass () {
      this.modalFlag = true
      this.modalInfo = {
        id: 0,
        cname: ''
      }
    },
    // 点击确定
    classOk () {
      let modalInfo = this.modalInfo
      if (!modalInfo.cname) return this.$Message.warning('请填写产品分类名称')
      this.modal_loading = true
      this.$httpPost({
        url: '/setProductClass',
        data: modalInfo
      }).then(res => {
        this.modal_loading = false
        let info = res.data
        if (info && info.success) {
          this.modalFlag = false
          this.$Message.success('保存成功')
          this.getProductClass()
        } else {
          this.$Message.error('保存失败')
        }
      }).catch(err => {
        this.modal_loading = false
        if (err) {}
      })
    },
    classCancel () {
      this.modalFlag = false
    },
    getProductClass () {
      this.tableLoadingFlag = true
      let _this = this
      this.getProductClassList({
        vm: this,
        callback: () => {
          setTimeout(() => {
            _this.tableLoadingFlag = false
          }, 1000)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>
