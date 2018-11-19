<template>
  <Upload
    ref="upload"
    :multiple="multiple"
    :show-upload-list="false"
    :before-upload="onHandleBeforeUpload"
    type="drag"
    action=""
    class="upload-file">
  <!-- 可替换区域 -->
  <slot>
    <div class="upload-file-add">
      <Icon size="30" type="ios-add" />
    </div>
  </slot>
  </Upload>
</template>
<script type="es6">
export default {
  props: {
    // 最大文件大小，0表示不限制大小
    'max-size': {
      default: 0,
      type: Number
    },
    // 文件类型，空数组表示不限定类型
    format: {
      default: () => [],
      type: Array
    },
    multiple: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {}
  },
  methods: {
    // 文件选取成功回调，有大小和类型限制则检查限制并触发相应事件，三个事件互斥，只会触发一个
    onHandleBeforeUpload (file) {
      // 获取文件类型
      let index = file.name.lastIndexOf('.')
      if (index === -1 || (index + 1 === file.name.length)) {
        this.$Message.error('不支持该文件类型')
        return
      }
      let fileType = file.name.substring(index + 1)
      // 判断是否是该类型文件或文件超出大小
      if (
        this.format.length &&
        !this.format.filter(item => fileType.toLowerCase() === item.toLowerCase()).length
      ) {
        this.$emit('onHandleFormatError', file)
      } else if (this.maxSize && this.maxSize * 1024 < file.size) {
        this.$emit('onHandleMaxSize', file)
      } else {
        this.$emit('onHandleBeforeUpload', file)
      }
      return false
    }
  }
}
</script>
<style lang="less" scoped>
// 默认为选择图片样式，需要改变则选择在父组件标签内添加DOM节点替换
.ivu-icon.ivu-icon-android-add {
    font-size: 20px;
}
.upload-file {
  position: relative;
  display: inline-block;
  width: 110px;
  height: 110px;
  .upload-file-add {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 108px;
    height: 108px;
    line-height: 108px;
    font-size: 12px;
    span {
      margin-left: 8px;
    }
  }
  /deep/.ivu-upload-drag{
    height: 110px;
    width: 110px;
    position: static;
  }
}
</style>
