<template>
    <div class="wrapper">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="商品名称：" prop="name">
                <Input class="commonInp" v-model="formValidate.gname" placeholder="请输入商品名称"></Input>
            </FormItem>
             <FormItem label="产品主图：" prop="imageDataFileArray" >
                <div class="product-edit-row">
                    <p class="color9 line-32">最多上传10张800*800后缀为JPG、PNG的图片，图片限制大小5M，拖拽图片可以调整图片的位置。</p>
                    <ImageDragable
                    ref="ImageDragableWrapper"
                    v-model="imageDataFileArray" :multiple="true" :format="['jpg', 'JPEG', 'png']" :picture-number="10" :max-size="1024 * 5" @onHandleFormatError="onHandleFormatError"></ImageDragable>
                </div>
            </FormItem>
            <FormItem label="商品价格：" prop="mail">
                <InputNumber class="commonInp" :precision="0"  :min="0" v-model="formValidate.price" placeholder="请输入商品价格"></InputNumber>
            </FormItem>
            <FormItem label="分类：">
              <Select v-model="formValidate.productClass" style="width:200px">
                <Option v-for="item in classProductList" :value="item.cid" :key="item.cid">{{ item.cname }}</Option>
              </Select>
            </FormItem>
            <FormItem label="库存：">
              <InputNumber class="commonInp"  :precision="0"  :min="0" v-model="formValidate.reserve" placeholder="请输入库存"></InputNumber>
            </FormItem>
            <FormItem label="排序：">
              <InputNumber class="commonInp" :max="999" :precision="0"  :min="0" v-model="formValidate.rank" ></InputNumber>
            </FormItem>
            <FormItem label="状态：">
              <RadioGroup v-model="formValidate.status">
                <Radio label="1">
                  发布
                </Radio>
                <Radio label="0">
                  不发布
                </Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="简介：">
               <Input class="commonInp" v-model="formValidate.desc" type="textarea" :rows="4" placeholder="简介" />
            </FormItem>
            <FormItem label="内容：" >
                <Editor ref="editorWrapper"></Editor>
            </FormItem>
        </Form>
        <CommonBottom @on-click="onBtn" :btnList="btnList"></CommonBottom>
    </div>
</template>
<script>
import ImageDragable from '@/components/common/ImageDragable/ImageDragable.vue'
import Editor from '@/components/common/Editor/Editor.vue'
import CommonBottom from '@/components/common/Bottom/CommonBottom.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      btnList: [
        {
          btnName: '保存',
          key: 'saveData',
          loading: false
        }
      ],
      imageDataFileArray: [],
      formValidate: {
        gname: '',
        price: 0,
        reserve: 1,
        desc: '',
        rank: 0,
        status: 1
      },
      ruleValidate: {

      },
      updateFlag: false
    }
  },
  created () {
    let classProductList = this.classProductList
    if (!classProductList || !classProductList.length) {
      this.getProductClass()
    }
  },
  components: {
    ImageDragable,
    Editor,
    CommonBottom
  },
  computed: {
    ...mapState(['classProductList'])
  },
  mounted () {
    this.getProductInfo(this.$route.query.id)
    this.updateFlag = this.$route.query.id
  },
  methods: {
    ...mapActions(['getProductClassList']),
    // 点击底部按钮
    onBtn (item) {
      this.handleSubmit('formValidate')
    },
    getProductClass () {
      this.getProductClassList({
        vm: this,
        callback: () => {}
      })
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let formValidate = this.formValidate
          formValidate.imgList = this.$refs['ImageDragableWrapper'].imageShowArray
          formValidate.content = this.$refs['editorWrapper'].content
          const msg = this.$Message.loading({
            content: '保存中...',
            duration: 0
          })
          let btnData = this.btnList[0]
          btnData.loading = true
          this.$httpPost({url: '/createdProduct', data: formValidate}).then(res => {
            msg()
            if (res.data && res.data.success) {
              this.$Message.success(this.updateFlag ? '修改成功' : '添加成功')
              setTimeout(() => {
                btnData.loading = false
                this.$router.go(-1)
              }, 2000)
            }
          }).catch(err => {
            msg()
            btnData.loading = false
            if (err) {
              this.$Message.error(this.updateFlag ? '修改失敗' : '添加失敗')
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    onHandleFormatError () {

    },
    getProductInfo (id) {
      if (!id) return
      this.$store.state.commonLoading = true
      this.$http.get('/productItem?id=' + id).then(res => {
        this.$store.state.commonLoading = false
        let info = res.data
        if (info) {
          this.imageDataFileArray = info.info.imgList
          this.$refs['editorWrapper'].content = info.info.content
          this.formValidate = info.info
        }
      }).catch(err => {
        this.$store.state.commonLoading = false
        if (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
