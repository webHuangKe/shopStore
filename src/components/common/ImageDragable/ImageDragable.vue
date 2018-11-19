<!--
    注意：该组件用于选择本地文件
    multiple ：只能显示一张还是多张，true为多张
    pictureNumber: 限制显示张数，超出不让点击弹出窗口
    value ：要显示的图片数组，当multiple为false时默认显示第一个，通过v-model进行双向绑定，该数组最终得到后台图片与本地图片数据的混合集
    maxSize, format
-->
<template>
  <div class="image-dragable-item clear" ref="imageDragable">
    <!--显示的图片列表-->
    <div class="image-dragable-list" v-if="multiple && domReshow" v-for="(item, index) in imageShowArray" :key="index">
      <Upload action="" :show-upload-list="false" type="drag" :before-upload="onImageBeforeUpload(index)">
        <img :src="item.url" alt="">
        <span  class="image-dragable-delete" @click.stop="onDeleteImage(index)"><Icon  size="30" type="ios-close" /></span>
      </Upload>
    </div>
    <!--选择图片框-->
    <div class="image-dragable-select"  v-if="(!pictureNumber || pictureNumber > value.length)">
      <UpLoadFile
       @onHandleBeforeUpload="onHandleBeforeUpload"
       :multiple="multiple" :max-size="maxSize"
       :format="format"
       @onHandleMaxSize="onHandleMaxSize" @onHandleFormatError="onHandleFormatError">
        <div class="image-dragable-show" v-if="(!multiple && imageShowArray.length)">
          <img :src="imageShowArray[0].url" alt="">
          <span  class="image-dragable-delete" @click.stop="onDeleteImage(0)"><Icon size="30" type="ios-close" /></span>
        </div>
      </UpLoadFile>
    </div>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
import { getImageData } from '@/common/js/utils.js'
import UpLoadFile from '@/components/common/UpLoadFile/UpLoadFile.vue'
export default {
  components: {
    UpLoadFile
  },
  props: {
    value: {
      default: () => [],
      type: Array
    },
    pictureNumber: {
      default: 0,
      type: Number
    },
    multiple: {
      default: true,
      type: Boolean
    },
    // 最大文件大小，0表示不限制大小
    maxSize: {
      default: 1024 * 2,
      type: Number
    },
    // 文件类型，空数组表示不限定类型
    format: {
      default: () => ['png', 'jpg', 'jpeg', 'PNG', 'JPG', 'JPEG'],
      type: Array
    }
  },
  data () {
    return {
      imageShowArray: [],
      domReshow: true,
      valueCopy: [] // 处理选择多张图片时是异步获取的bug
    }
  },
  watch: {
    value (val) {
      this.valueCopy = val.concat()
      let statusArray = []
      // 用于存取异步执行的对象
      let promiseAll = []
      // 获取已存在的图片数组
      let that = this
      val.forEach(function (item, index) {
        let _index = index
        let _item = item
        if (typeof item === 'string') {
          statusArray.push({
            url: that.$http.defaults.baseURL + '/' + item
          })
        } else {
          // 先在数组占位，再加入异步执行替换
          statusArray.push({ url: '' })
          promiseAll.push(
            new Promise(resolve => {
              getImageData([_item], file => {
                statusArray[_index] = {
                  url: file[0],
                  name: _item.name
                }
                resolve()
              })
            })
          )
        }
      })
      // 判断是否有异步并赋值更新DOM节点
      if (promiseAll.length) {
        Promise.all(promiseAll).then(() => {
          this.domReshow = false
          this.imageShowArray = statusArray
          this.$nextTick(() => {
            this.domReshow = true
          })
        })
      } else {
        this.domReshow = false
        this.imageShowArray = statusArray
        this.$nextTick(() => {
          this.domReshow = true
        })
      }
    }
  },
  mounted () {
    this.resetSort()
  },
  methods: {
    // 切换图片
    onImageBeforeUpload (index) {
      return (file) => {
        // 获取文件类型
        let indexName = file.name.lastIndexOf('.')
        if (indexName === -1 || (indexName + 1 === file.name.length)) {
          this.$Message.error('不支持该文件类型')
          return
        }
        let fileType = file.name.substring(indexName + 1)
        // 判断是否是该类型文件或文件超出大小
        if (
          this.format.length &&
          !this.format.filter(item => fileType.toLowerCase() === item.toLowerCase()).length
        ) {
          this.onHandleFormatError(file)
        } else if (this.maxSize && this.maxSize * 1024 < file.size) {
          this.onHandleMaxSize(file)
        } else {
          let statusArray = this.value.concat()
          statusArray.splice(index, 1, file)
          this.$emit('input', statusArray)
        }
        return false
      }
    },
    resetSort () {
      var el = this.$refs.imageDragable
      let vm = this
      Sortable.create(el, {
        onEnd: vm.onDragableEnd,
        sort: true,
        filter: '.image-dragable-select',
        onMove: function (evt) {
          if (evt.related) {
            return !evt.related.classList.contains('image-dragable-select')
          }
        }
      })
    },
    // UpLoadFile组件对应的事件
    onHandleBeforeUpload (file) {
      let statusArray = this.valueCopy
      if (this.multiple && statusArray.length < this.pictureNumber) {
        statusArray.push(file)
        this.$emit('input', statusArray)
      } else if (!this.multiple) {
        statusArray.push(file)
        this.$emit('input', statusArray)
      }
    },
    onHandleFormatError (file) {
      this.$emit('onHandleFormatError', file)
    },
    onHandleMaxSize (file) {
      this.$emit('onHandleMaxSize', file)
    },
    // 新的数据位置
    onDragableEnd (e) {
      let statusArray = this.value.concat()
      let deleteObject = statusArray.splice(e.oldIndex, 1)
      statusArray.splice(e.newIndex, 0, deleteObject[0])
      this.$emit('input', statusArray)
    },
    // 触发点击删除图片
    onDeleteImage (index) {
      let statusArray = this.value.concat()
      statusArray.splice(index, 1)
      this.$emit('input', statusArray)
    }
  }
}
</script>
<style lang="less" scoped>
.image-dragable-item {
  margin-bottom: -12px;
  margin-right: -12px;
  // 拖拽列表
  .image-dragable-list {
    position: relative;
    float: left;
    height: 110px;
    width: 110px;
    margin-right: 12px;
    margin-bottom: 12px;
    border: 1px solid #e9e9e9;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      .image-dragable-delete {
        display: inline-block;
      }
    }
    /deep/.ivu-upload{
      height: 100%;
      .ivu-upload-drag{
        height: 100%;
        border: none;
      }
    }
  }
  // 选择文件的框
  .image-dragable-select {
    margin-right: 12px;
    margin-bottom: 12px;
    cursor: pointer;
    float: left;
    height: 110px;
    width: 110px;
    text-align: center;
    /deep/.image-dragable-show {
      position: relative;
      border-radius: 4px;
      overflow: hidden;
      width: 100%;
      height: 100%;
      &:hover {
        .image-dragable-delete {
          display: inline-block;
        }
      }
    }
  }
  // 删除按钮
  .image-dragable-delete {
    display: none;
    position: absolute;
    top: 5px;
    right: -2px;
    text-align: center;
    width: 18px;
    height: 18px;
    transform: translate(-50%, -50%);
    /deep/.ivu-icon {
      display: block;
      margin-top: 4px;
    }
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
