/**
 *
 * @param {input中图片的数据} file
 * @param {拿到经过处理的图片（base64）数据后的回调} fn
 * 支持多图片
 */
export function getImageData (file, fn) {
  if (typeof FileReader === 'undefined') {
    alert('您的浏览器不支持图片上传，请升级您的浏览器')
    return false
  }
  let images = []
  let leng = file.length
  for (let i = 0; i < leng; i++) {
    var reader = new FileReader()
    reader.readAsDataURL && reader.readAsDataURL(file[i])
    reader.onload = function (e) {
      images.push(e.target.result)
      if (images.length === leng) {
        fn && fn(images)
      }
    }
  }
}
// 改变日期格式
/**
 *
 * @param {data 需要修改的时间} data
 */
export function changeTime (data) {
  let date = new Date(data)
  let mm = date.getMinutes()
  let hours = date.getHours()
  let seconds = date.getSeconds()
  let month = date.getMonth() + 1
  let day = date.getDate()
  if (mm < 10) mm = '0' + mm
  if (hours < 10) hours = '0' + hours
  if (seconds < 10) seconds = '0' + seconds
  if (month < 10) month = '0' + month
  if (day < 10) day = '0' + day
  return (
    date.getFullYear() +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hours +
    ':' +
    mm +
    ':' +
    seconds
  )
}
/**
 * obj
 *  {
 *    callback 对应的是 IntersectionObserver的回调
 *    data     对应的是 IntersectionObserver的参数
 *    Dom      监听的元素
 *  }
 */
export function getElementOverlapData ({callback = function () {}, data = {}, Dom = window}) {
  if (!IntersectionObserver) return
  let io = new IntersectionObserver(entries => {
    callback && callback(entries)
  }, data)
  io.observe(Dom)
}

// 获取输入框的字符长度是否在限定字符数内
/**
 *
 * @param str 输入框的内容
 * @param num 限制多少个字符长度 1个汉字2个字符，限制10个汉字就要num=20
 */
export function getLength (str, num) {
  var realLength = 0
  var len = str === null ? '' : str.length
  var charCode = -1
  for (var i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      realLength += 2
    }
  }
  if (realLength > num) {
    return true
  } else {
    return false
  }
}
