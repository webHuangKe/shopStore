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
              <Select v-model="formValidate.productClassId" style="width:200px">
                <Option v-for="item in classProductList" :value="item.cid" :key="item.cid">{{ item.cname }}</Option>
              </Select>
            </FormItem>
            <FormItem label="规格：">
              <ProductDetailRelease v-model="releaseList" @onBlurCurrent="onBlurCurrent"></ProductDetailRelease>
            </FormItem>
            <FormItem label="规格明细：" v-if="releaseListShowTitle && releaseListShowTitle.length">
              <div  class="m-b-16">
                <span class="m-r-16">批量设置</span>
                <Input class="m-r-8" v-model="preinstallNum.sellingPrice" @on-blur="changeBatchData('sellingPrice')" :number="true" placeholder="售价" style="width: 80px" />
                <Input class="m-r-8" v-model="preinstallNum.inventory" @on-blur="changeBatchData('inventory')" :number="true" placeholder="库存" style="width: 80px" />
                <Button type="primary" @click="showSetNumber">应用</Button>
              </div>
              <table class="table-wrapper" cellspacing="0" width="100%" cellpadding="0" border="0">
                <thead>
                  <tr >
                    <th class="title-th " v-for="(item, index) in releaseListShowTitle" :key="index">
                      {{item.skuName}}
                    </th>
                    <th class="title-th " >
                      售价
                    </th>
                    <th class="title-th ">
                      库存
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in showAttrData" :key="index">
                    <td :rowspan="val.rowSpan"  v-for="(val, idx) in item" :key="idx" >
                      <div  v-if="!val.sku_costPrice_flag&&!val.sku_price_flag&&!val.sku_productQuantity_flag">
                        {{val.attrVals&&val.attrVals.skuVal? val.attrVals.skuVal :''}}
                      </div>
                      <div v-if="val.sku_price_flag" class="p-tblr-12" >
                        <InputNumber  :min="0" :max="999999999.99" v-model="val.price" style="width: 100%"></InputNumber>
                      </div>
                      <div v-if="val.sku_productQuantity_flag" class="p-tblr-12">
                        <InputNumber  :min="0" :max="999999999.99"  v-model="val.reserve" style="width: 100%"></InputNumber>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
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
        <CommonBottom @onClick="onBtn" :btnList="btnList"></CommonBottom>
    </div>
</template>
<script>
import ImageDragable from '@/components/common/ImageDragable/ImageDragable.vue'
import ProductDetailRelease from '@/components/common/productSku/ProductDetailRelease.vue'
import Editor from '@/components/common/Editor/Editor.vue'
import CommonBottom from '@/components/common/Bottom/CommonBottom.vue'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      releaseList: [], // 规格数据
      preinstallNum: {
        sellingPrice: '',
        inventory: ''
      },
      releaseListShowTitle: [],
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
        status: '1',
        productClassId: 0
      },
      ruleValidate: {

      },
      updateFlag: 0,
      skuGroupList: [] // 编辑时 获取到已有的规格组合
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
    CommonBottom,
    ProductDetailRelease
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
    onBlurCurrent (data) {
      this.getReleaseListAndShow()
    },
    // 渲染规格数据列表
    getReleaseListAndShow () {
      let releaseList = this.releaseList
      let filterArrData = []
      // 循环获取
      releaseList.forEach(item => {
        if (item.attrVals && item.attrVals.length && item.skuName) {
          let pp = []
          item.attrVals.forEach(kk => {
            if (!kk.skuVal) return
            if (kk && kk.skuVal) {
              pp.push(kk)
            }
          })
          let data = {...item, ...{attrVals: pp}}
          if (pp.length) {
            filterArrData.push(data)
          }
        }
      })
      // 表头标题
      this.releaseListShowTitle = filterArrData
      if (!filterArrData || !filterArrData.length) {
        this.showAttrData = []
        this.filterArrDataList = filterArrData
        return
      }
      let contentArr = []
      let allNumber = 1
      // 计算总共有多少行
      filterArrData.forEach((item, index) => {
        let attrVals = item.attrVals
        item.skuId = item.skuId || 'n' + Math.floor((10 + Math.random()) * 1000000) + index
        if (attrVals && attrVals.length) {
          let numData = 0
          attrVals.forEach((val, idx) => {
            numData++
            val.skuValId = val.skuValId || 'n' + Math.floor((10 + Math.random()) * 1000000) + idx
            val.AttrValBigImg = val.AttrValBigImg
            val.AttrValSamllImg = val.AttrValSmallImg
          })
          allNumber = allNumber * numData
          item.allNumber = allNumber
        }
      })
      this.allNumber = allNumber
      // 计算合并列的数量
      filterArrData.forEach(item => {
        let attrVals = item.attrVals
        if (attrVals && attrVals.length) {
          item.rowSpan = allNumber / item.allNumber
        }
      })
      // 根据总行数拼接列表数据
      for (let k = 0; k < allNumber; k++) {
        contentArr[k] = []
        filterArrData.forEach((item, index) => {
          // 根据合并的列表数进行添加数据
          if (!(k % item.rowSpan)) {
            let attrValsLen = item.attrVals.length
            if (!attrValsLen) return false
            let itemAttrVals = item.attrVals[k % attrValsLen] || {}
            let data = {
              rowSpan: item.rowSpan,
              index,
              skuVal: itemAttrVals.skuVal,
              AttrValBigImg: itemAttrVals.AttrValBigImg,
              AttrValSamllImg: itemAttrVals.AttrValSmallImg,
              path: item.skuId,
              skuValId: itemAttrVals ? itemAttrVals.skuValId : '',
              skuName: item.skuName,
              currentIndexes: k % attrValsLen || 0, // 当前行的对于规格值的索引
              attrVals: itemAttrVals
            }
            // 如果不是第一行
            if (k > 0) {
              // 找到对应的上一个循环这个规格的规格值
              if (contentArr[k - item.rowSpan]) {
                let allItems = contentArr[k - item.rowSpan]
                // 在这一行中找到对应规格的位置
                allItems.forEach(valChild => {
                  if (valChild.index === index) {
                    if (valChild.rowSpan) {
                      let currentNum = valChild.currentIndexes + 1
                      // 如果规格值是一个那么索引是0  如果上一个对应的规格的规格值是最后一个规格值的话 当前就显示第一个规格值[0] 如果都不是就 上一个基础上索引+1
                      data.currentIndexes = attrValsLen === 1 || valChild.currentIndexes === (attrValsLen - 1) ? 0 : currentNum
                      data.attrVals = item.attrVals[data.currentIndexes]
                      data.skuValId = item.attrVals[data.currentIndexes].skuValId
                    }
                  }
                })
              }
            }
            contentArr[k].push(data)
          }
        })
        contentArr[k].push({
          sku_price_flag: true,
          price: 0,
          indexInp: k
        })
        contentArr[k].push({
          sku_productQuantity_flag: true,
          reserve: 0,
          indexInp: k
        })
      }
      this.showAttrData = contentArr
      this.filterArrDataList = filterArrData
      let skuGroupList = this.skuGroupList
      if (skuGroupList && skuGroupList.length) {
        let showSkuData = []
        this.getSpecificationDetails((itemVal, itemInfo) => {
          let q = this.getSkuOldData(itemInfo)
          itemVal.forEach(k => {
            k.skuAttrId = q.skuAttrId
            k.price = q.price
            k.reserve = q.reserve
          })
          showSkuData.push(itemVal)
        })
      }
    },
    // 某一行 获取原来的售价库存的值
    getSkuOldData (currentItem) {
      let dataNum = {}
      if (currentItem && !currentItem.length) return dataNum
      let skuGroupList = this.skuGroupList
      let dataArr = []
      // 找到规格值的ID
      currentItem.forEach(item => {
        if (item.rowSpan) {
          dataArr.push(item.skuValId)
        }
      })
      skuGroupList.forEach(oldVal => {
        let arr = oldVal.group.split(',')
        let num = 0
        arr.forEach(item => {
          item = item - 0
          let val = dataArr.find(l => {
            return l === item
          })
          if (val) {
            num++
          }
        })
        if (num === dataArr.length && num === arr.length) {
          dataNum = {
            skuAttrId: oldVal.skuAttrId,
            price: oldVal.price || 0,
            reserve: oldVal.reserve || 0
          }
          return false
        }
      })
      return dataNum
    },
    // 每行的数据 处理规格数据
    disposeSpecificationData (item, firstFn) {
      let arr = []
      let data = {}
      item.forEach(val => {
        if (val.rowSpan) {
          arr.push(val.skuValId)
        }
        if (val.sku_price_flag) {
          data.price = val.price
        }
        if (val.sku_productQuantity_flag) {
          data.reserve = val.reserve
        }
      })
      data.path = arr
      firstFn && firstFn(data)
    },
    // 获取所有可能的规格组合
    getSpecificationDetails (fn) {
      let skuPostArray = []
      let releaseList = this.filterArrDataList
      let overallData = [] // 完整的数据
      // 总共有多少个规格名
      let releaseListLen = releaseList.length
      // 循环规格列表  获取对应的规格组合和对应的价格库存等 循环获取每一行
      this.showAttrData.forEach((item, index) => {
        // 当前行可以输入的规格值有多少个
        let currentNumIt = item.length - 2
        // 大的换行
        if (releaseListLen === currentNumIt) {
          overallData.push(item)
          if (fn) {
            fn(item, item)
          } else {
            this.disposeSpecificationData(item, (obj) => {
              skuPostArray.push({
                ...obj
              })
            })
          }
        // 如果当前行 规格值数量小于最大值
        } else if (releaseListLen > currentNumIt) {
          // 用于保存当前行对应的规格组合 就像releaseListLen === currentNumIt相等的时候一样处理数据
          let curretItem = []
          // 查看相差多少个规格值
          let differenceNum = releaseListLen - currentNumIt
          for (let i = 0; i < differenceNum; i++) {
            curretItem.push(overallData[index - 1][i])
          }
          curretItem = [...curretItem, ...item]
          overallData.push(curretItem)
          if (fn) {
            fn(item, curretItem)
          } else {
            // 循环行，获取每一项规格值
            this.disposeSpecificationData(curretItem, (obj) => {
              skuPostArray.push({
                ...obj
              })
            })
          }
        }
      })
      return skuPostArray
    },
    // 应用价格和库存
    showSetNumber () {

    },
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
      let updateFlag = this.updateFlag
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
          if (updateFlag) {
            formValidate.gid = updateFlag
          }
          this.$httpPost({url: '/createdProduct', data: formValidate}).then(res => {
            if (res.data && res.data.success) {
              let filterArrDataList = this.filterArrDataList
              if (filterArrDataList && filterArrDataList.length) {
                let skuInfoList = this.getSpecificationDetails()
                this.$httpPost({url: '/addProductSku',
                  data: {
                    skuInfoList,
                    filterArrDataList,
                    gid: updateFlag || res.data.gid
                  }}).then(skuRes => {
                  msg()
                  let skuData = skuRes.data
                  if (skuData && skuData.success) {
                    this.$Message.success(updateFlag ? '修改成功' : '添加成功')
                    setTimeout(() => {
                      btnData.loading = false
                      this.$router.go(-1)
                    }, 1000)
                  }
                }).catch(err => {
                  msg()
                  btnData.loading = false
                  if (err) {
                    this.$Message.error(updateFlag ? '修改失敗' : '添加失敗')
                  }
                })
              } else {
                msg()
                this.$Message.success(updateFlag ? '修改成功' : '添加成功')
                setTimeout(() => {
                  btnData.loading = false
                  this.$router.go(-1)
                }, 2000)
              }
            } else {
              msg()
            }
          }).catch(err => {
            msg()
            btnData.loading = false
            if (err) {
              this.$Message.error(updateFlag ? '修改失敗' : '添加失敗')
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
          this.imageDataFileArray = info.imgList
          this.$refs['editorWrapper'].content = info.info.content
          this.formValidate = info.info
          if (info.skuNameList && info.skuNameList.length) {
            this.releaseList = info.skuNameList || []
            this.skuGroupList = info.skuList || []
            this.releaseList.reverse()
            this.getReleaseListAndShow()
          }
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
.table-wrapper {
  border: solid #e9e9e9;
  border-width:1px 0px 0px 1px;
  td{
    border:solid #e9e9e9;
    border-width:0px 1px 1px 0px;
    text-align: center;
  }

}
.title-th{
  height: 40px;
  padding: 12px 0;
  color: #000;
  box-sizing: border-box;
  background-color: #f6f8fb;
}
.p-tblr-12{
  padding: 12px;
}
</style>
