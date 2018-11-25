export default {
  getProductClassList ({state}, {vm, callback}) {
    vm.$http.get('/productClassList').then(res => {
      let info = res.data
      callback && callback()
      if (info && info.success) {
        state.classProductList = info.list || []
      }
    }).catch(err => {
      callback && callback()
      if (err) {}
    })
  }
}
