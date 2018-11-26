<template>
  <div class="product-edit-release-item p-16">
    <div class="product-edit-release-group" v-for="(item, index) in productReleaseList" :key="index">
      <div class="product-edit-release-grey clear">
        <div class="product-edit-release-left">规格名：</div>
        <div class="product-edit-release-right">
          <Input
          v-model.trim="item.AttrKeyName"
          @on-change="onInputChange"
          @on-focus="onInputFocus(index)"
          @on-blur="onBlurCurrent(item.AttrKeyName, index, 'AttrKeyName')"/>
          <Checkbox v-model="item.hasImg" true-value="1" false-value="0" @on-change="onImageRealeaseLocalChange(index)">添加规格图</Checkbox>
          <span class="product-edit-release-tip color9">仅支持其中一组可上传多规格图（建议800*800）</span>
        </div>
      </div>
      <div class="product-edit-release-white clear">
        <div class="product-edit-release-left">规格值：</div>
        <div class="product-edit-release-right" style="font-size: 0;">
          <div class="add-product-release-value"  v-if="item.attrVals&&item.attrVals.length" v-for="(item1, index1) in item.attrVals" :key="index1">
            <Upload action="" :before-upload="onUploadRelease(index,index1)">
              <Icon type="md-image" size="30" v-show="!item1.AttrValSmallImg" v-if="item.hasImg === '1'"/><img :src="(item1.AttrValSmallImg && item1.AttrValSmallImg.search('data:image') > -1)?item1.AttrValSmallImg:($http.defaults.baseURL + item1.AttrValSmallImg)" v-show="item1.AttrValSmallImg" v-if="item.hasImg === '1'">
            </Upload>
            <Input v-model="item1.AttrValName" @on-blur="onBlurCurrent(item1.AttrValName, index1, 'AttrValName', index)" @on-change="onInputChange" icon="close-round" @on-click="onReleaseValueClick(index, index1)"/>
          </div>
          <span @click="addReleaseValue(index)" class="add-value-button" :class="{'add-margin': item.attrVals&&item.attrVals.length}">添加规格值</span></div>
      </div>
      <span class="product-release-remove" @click="removeReleaseList(index)"><Icon size="20" type="ios-close" color="#fff" /></span>
    </div>
    <div class="product-edit-release-grey"><Button type="primary" @click="addProductRelease">添加规格</Button></div>
  </div>
</template>
<script>
import { getImageData } from '@/common/js/utils.js'
export default {
  props: {
    value: {
      default: () => [],
      type: Array
    }
  },
  data () {
    return {
      showReleaseList: [],
      showReleaseListFlag: -1,
      productReleaseList: []
    }
  },
  watch: {
    value (val) {
      this.productReleaseList = val
    }
  },
  mounted () {
  },
  methods: {
    // 获取你点击的文本
    getCurrentText (index, text) {
      this.productReleaseList[index].AttrKeyName = text
      this.$emit('input', this.productReleaseList)
    },
    // 规格名称聚焦的时候
    onInputFocus (index) {
      this.showReleaseListFlag = index
    },
    // 输入框失去焦点的时候
    onBlurCurrent (val, indexVal, key, index) {
      if (val && val.length > 30) {
        this.$Message.warning('输入的字数不能超过30个字')
        if (key === 'AttrValName') {
          this.productReleaseList[index]['attrVals'][indexVal][key] = val.slice(0, 30)
        } else {
          this.productReleaseList[indexVal][key] = val.slice(0, 30)
        }
      }
      this.$emit('onBlurCurrent')
      setTimeout(() => {
        this.showReleaseListFlag = -1
      }, 300)
    },
    // 添加产品规格
    addProductRelease () {
      if (this.productReleaseList && this.productReleaseList.length >= 5) {
        this.$Message.error('最多添加5个规格名')
        return
      }
      this.productReleaseList.push({
        attrVals: []
      })
      this.$emit('input', this.productReleaseList)
    },
    // 添加产品规格值
    addReleaseValue (index) {
      if (this.productReleaseList && this.productReleaseList[index].attrVals && this.productReleaseList[index].attrVals.length >= 50) {
        this.$Message.error('最多添加50个规格值')
        return
      }
      if (!this.productReleaseList[index].attrVals) {
        this.productReleaseList[index].attrVals = []
      }
      this.productReleaseList[index].attrVals.push({})
      this.$emit('input', this.productReleaseList)
    },
    removeReleaseList (index) {
      this.productReleaseList.splice(index, 1)
      this.$emit('input', this.productReleaseList)
      this.$emit('onBlurCurrent')
    },
    // 选择显示那一行规格图
    onImageRealeaseLocalChange (index) {
      this.productReleaseList.forEach((item, index1) => {
        if (index !== index1) {
          item.hasImg = '0'
        }
      })
      this.$emit('input', this.productReleaseList)
    },
    // 删除规格值
    onReleaseValueClick (index, index1) {
      this.productReleaseList[index].attrVals.splice(index1, 1)
      this.$emit('input', this.productReleaseList)
      this.$emit('onBlurCurrent')
    },
    // 所有的input框绑定
    onInputChange () {
      this.$emit('input', this.productReleaseList)
    },
    // 上传规格值图片文件
    onUploadRelease (index, index1) {
      return (file) => {
        let fileType = file.type.split('/')[1] || ''
        if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
          this.productReleaseList[index].attrVals[index1].file = file
          getImageData([file], ([val]) => {
            this.$set(
              this.productReleaseList[index].attrVals[index1],
              'AttrValSmallImg',
              val
            )
            this.$emit('input', this.productReleaseList)
            this.$emit('onBlurCurrent')
          })
        } else {
          this.$Message.error('只支持jpg，jpeg，png格式图片')
        }
        return false
      }
    }
  }
}
</script>
<style lang="less" scoped>
.select-release-list{
  position: absolute;
  left: 0;
  width: 280px;
  background-color: #fff;
  top: 32px;
  margin: 5px 0;
  max-height: 150px;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 1;
  border-radius: 4px;
  padding: 5px 0;
  box-shadow: 0 1px 6px rgba(0,0,0,.2);
  li{
    padding: 5px 10px;
    cursor: pointer;
    &:hover{
      background-color: #f8f8f8;
    }
  }
}
.product-edit-release-item {
  border: 1px solid #e9e9e9;
  .product-edit-release-white {
    padding: 16px 12px;
  }
  // 删除图标
  .product-edit-release-group {
    position: relative;
    .product-release-remove {
      cursor: pointer;
      display: none;
      position: absolute;
      top: 22px;
      right: 36px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.5);
      font-size: 12px;
      color: #fff;
    }
    &:hover {
      .product-release-remove {
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background: #f23a61;
        }
      }
    }
  }
  .product-edit-release-grey {
    background: #f8f8fb;
    border-radius: 4px;
    padding: 16px 12px;
    // 规格名输入框
    /deep/.ivu-input-wrapper {
      width: 280px;
      margin-right: 12px;
    }
    // 规格名勾选
    /deep/.ivu-checkbox-wrapper {
      margin-right: 16px;
      .ivu-checkbox {
        margin-right: 6px;
      }
    }
    .product-edit-release-tip {
      color: #495060;
    }
  }
  .product-edit-release-left {
    line-height: 32px;
    float: left;
    width: 48px;
    margin-right: 7px;
    position: relative;
    &:before{
      content:"*";
      position: absolute;
      top: 2px;
      left: -8px;
      color: #ff1e1e;
    }
  }
  .product-edit-release-right {
    position: relative;
    float: left;
    width: calc(100% - 55px);
  }
  // 添加规格值
  .add-product-release-value {
    display: inline-block;
    margin-bottom: 12px;
    margin-right: 20px;
    img {
      display: inline-block;
      vertical-align: middle;
      width: 32px;
      height: 32px;
      margin-right: 8px;
      border-radius: 4px;
    }
    /deep/.ivu-input-wrapper {
      width: 180px;
      .ivu-icon {
        cursor: pointer;
        display: none;
      }
    }
    &:hover {
      /deep/.ivu-input-wrapper {
        .ivu-icon {
          display: inline-block;
        }
      }
    }
  }
  .add-value-button {
    margin-left: 12px;
    cursor: pointer;
    color: #6b97ce;
    line-height: 32px;
    vertical-align: top;
    font-size: 12px;
    display: inline-block;
    margin-bottom: 12px;
    &.add-margin {
      margin-left: -8px;
    }
  }
  /deep/.ivu-upload {
    display: inline-block;
    cursor: pointer;
    .ivu-upload-list{
      display: none;
    }
  }
}
</style>
