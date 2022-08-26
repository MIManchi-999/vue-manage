import config from '@/config'
import Mock from 'mockjs'

// get请求从config.url获取参数，post从config.body中获取参数
function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"') +
    '"}'
  )
}

let list = []
const count = 200
for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname() + "牌苹果",
      price: Mock.Random.float(2.5, 15.5).toFixed(2),
      count: Mock.Random.integer(120, 1800),
      total: 0
    })
  )
}

export default {
  // 获取商品数据
  getGoods: config => {
    console.log(config)
    const {
      page = 1, limit = 20
    } = param2Obj(config.url)
    const goods = list.map(item => {
      item.total = parseInt(item.price * item.count)
      return item
    })
    const goodList = goods.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    return {
      code: 20000,
      count: list.length,
      list: goodList
    }
  },
  // 删除单个商品数据
  delGoods: config => {
    console.log(config)
    const {
      id
    } = param2Obj(config.url)
    if (!id) {
      return {
        code: -999,
        message: '删除失败'
      }
    } else {
      list = list.filter(item => item.id !== id)
      return {
        code: 2000,
        message: "删除成功"
      }
    }
  },
  //删除全部
  clearAll: config => {
    console.log(config)
    list = []
    return {
      code: 20000,
      message: "全部清空成功！"
    }
  }
}