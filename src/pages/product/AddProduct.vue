<template>
    <div class="wrapper">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="商品名称：" prop="name">
                <Input class="commonInp" v-model="formValidate.name" placeholder="请输入商品名称"></Input>
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
            <FormItem label="库存：">
              <InputNumber class="commonInp"  :precision="0"  :min="0" v-model="formValidate.reserve" placeholder="请输入库存"></InputNumber>
            </FormItem>
            <FormItem label="简介：">
               <Input class="commonInp" v-model="formValidate.desc" type="textarea" :rows="4" placeholder="Enter something..." />
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
export default {
  data () {
    return {
      btnList: [
        {
          btnName: '保存',
          key: 'saveData'
        }
      ],
      imageDataFileArray: [],
      formValidate: {
        name: '',
        price: 0,
        reserve: 1,
        desc: ''
      },
      ruleValidate: {

      }
    }
  },
  components: {
    ImageDragable,
    Editor,
    CommonBottom
  },
  mounted () {
    this.getProductInfo(this.$route.query.id)
    console.log(this.$route.query, '.$route.query')
  },
  methods: {
    // 点击底部按钮
    onBtn (item) {
      this.handleSubmit('formValidate')
    },
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let formValidate = this.formValidate
          formValidate.imgList = this.$refs['ImageDragableWrapper'].imageShowArray
          formValidate.content = this.$refs['editorWrapper'].content
          this.$httpPost({url: '/createdProduct', data: formValidate}).then(res => {
            console.log(res, 9999999999)
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
      this.$http.get('/productItem?id=' + id).then(res => {
        console.log(res, 66666666)
      }).catch(err => {
        console.log(err, 4444444444)
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
