import Main from '@/pages/index/index'
import RightPage from '@/components/common/Menu/RightPage'
const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录注册',
      hideMenuFlag: true
    },
    component: () => import('@/pages/login/Login')
  },
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: Main
  },
  {
    path: '/product',
    name: 'Product',
    component: Main,
    meta: {
      title: '产品'
    },
    redirect: { name: 'ProductList' },
    children: [
      {
        path: '/productList',
        name: 'ProductList',
        meta: {
          title: '产品列表',
          BreadcrumbFlag: true
        },
        component: RightPage,
        redirect: { name: 'ProductLists' },
        children: [
          {
            path: 'productList',
            name: 'ProductLists',
            meta: {
              title: '产品列表',
              BreadcrumbFlag: true,
              breadcrumbList: [
                {
                  title: '产品列表',
                  name: 'ProductList'
                }
              ]
            },
            component: () => import('@/pages/product/ProductList')
          },
          {
            path: 'addProduct',
            name: 'AddProduct',
            meta: {
              title: '添加产品',
              breadcrumbList: [
                {
                  title: '产品列表',
                  name: 'ProductList'
                },
                {
                  title: '添加产品',
                  name: 'AddProduct'
                }
              ]
            },
            component: () => import('@/pages/product/AddProduct')
          },
          {
            path: 'updateProduct',
            name: 'UpdateProduct',
            meta: {
              title: '编辑产品',
              breadcrumbList: [
                {
                  title: '产品列表',
                  name: 'ProductList'
                },
                {
                  title: '编辑产品',
                  name: 'UpdateProduct'
                }
              ]
            },
            component: () => import('@/pages/product/AddProduct')
          }
        ]
      }
    ]
  },
  {
    path: '/marking',
    name: 'Marking',
    meta: {
      title: '营销'
    },
    redirect: { name: 'GroupList' },
    component: Main,
    children: [
      {
        path: 'groupList',
        name: 'GroupList',
        meta: {
          title: '拼团',
          BreadcrumbFlag: true
        },
        component: RightPage,
        redirect: {name: 'GroupListManage'},
        children: [
          {
            path: 'groupListManage',
            name: 'GroupListManage',
            meta: {
              title: '拼团',
              breadcrumbList: [
                {
                  title: '拼团',
                  name: 'GroupListManage'
                }
              ]
            },
            component: () => import('@/pages/marking/group/Group')
          }
        ]
      },
      {
        path: 'coupon',
        name: 'Coupon',
        meta: {
          title: '优惠券'
        },
        redirect: { name: 'CouponManage' },
        component: RightPage,
        children: [
          {
            path: 'couponManage',
            name: 'CouponManage',
            meta: {
              title: '优惠券管理',
              thirdMenusList: [
                {
                  title: '优惠券管理',
                  name: 'CouponManage'
                },
                {
                  title: '优惠券领取记录',
                  name: 'CouponRecords'
                }
              ]
            },
            component: () => import('@/pages/marking/coupon/CouponManage')
          },
          {
            path: 'couponRecords',
            name: 'CouponRecords',
            meta: {
              title: '优惠券领取记录',
              thirdMenusList: [
                {
                  title: '优惠券管理',
                  name: 'CouponManage'
                },
                {
                  title: '优惠券领取记录',
                  name: 'CouponRecords'
                }
              ]
            },
            component: () => import('@/pages/marking/coupon/CouponRecords')
          }
        ]
      }
    ]
  }
]
export default routes
