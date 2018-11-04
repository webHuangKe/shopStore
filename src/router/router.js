import Main from '@/pages/index/index'
const routes = [
  {
    path: '/',
    name: 'Home',
    title: '首页',
    component: Main,
    meta: {
      title: 'sssssss'
    },
    children: [
      {
        path: '/productLists',
        name: 'ProductLists',
        title: '产品列表',
        meta: {
          nav: ['Home']
        },
        component: () => import('@/pages/product/ProductList')
      }
    ]
  },
  {
    path: '/product',
    name: 'Product',
    component: Main,
    title: '产品列表',
    redirect: { name: 'ProductList' },
    children: [
      {
        path: '/product/productList',
        name: 'ProductList',
        title: '产品列表',
        component: () => import('@/pages/product/ProductList')
      },
      {
        path: '/product/addProduct',
        name: 'addProduct',
        title: '添加产品',
        component: () => import('@/pages/product/ProductList')
      },
      {
        path: '/Product/updateProduct',
        name: 'updateProduct',
        title: '编辑产品',
        component: () => import('@/pages/product/ProductList')
      }
    ]
  },
  {
    path: '/Group',
    name: 'Group',
    title: '拼团',
    redirect: { name: 'GroupList' },
    component: Main,
    children: [
      {
        path: '/GroupList',
        name: 'GroupList',
        title: '拼团',
        component: () => import('@/pages/marking/Group')
      }
    ]
  },
  {
    path: '/Order',
    name: 'Order',
    title: '订单列表',
    component: Main,
    redirect: { name: 'OrderData' },
    children: [
      {
        path: '/OrderData',
        name: 'OrderData',
        title: '订单列表',
        component: () => import('@/pages/order/OrderList')
      }
    ]
  },
  {
    path: '/Setting',
    name: 'Setting',
    title: '设置',
    component: Main,
    redirect: { name: 'SettingData' },
    children: [
      {
        path: '/SettingData',
        name: 'SettingData',
        title: '设置',
        component: () => import('@/pages/setting/Setting')
      }
    ]
  }
]
export default routes
