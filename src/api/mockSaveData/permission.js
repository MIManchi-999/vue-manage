import config from '@/config';
import Mock from 'mockjs'
let root = {
  username: 'admin',
  password: 'admin'
}

let user = {
  username: 'zuber',
  password: 'zuber'
}

export default {
  getUserInfo: config => {
    console.log(config);
    const {
      username,
      password
    } = JSON.parse(config.body)
    // root账号
    if (username === root.username && password === root.password) {
      return {
        code: 20000,
        data: {
          menu: [{
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
            },
            {
              path: '/user',
              name: 'user',
              label: '用户管理',
              icon: 'user',
            },
            {
              label: '其他',
              icon: 'location',
              children: [{
                  path: '/page1',
                  name: 'page1',
                  label: '页面1',
                  icon: 'setting',
                },
                {
                  path: '/page2',
                  name: 'page2',
                  label: '页面2',
                  icon: 'setting',
                }
              ]
            }
          ],
          token: Mock.Random.guid(),
          username: 'Root',
          authority: '管理员',
          message: '获取成功'
        }
      }
    }
    // 普通账号
    else if (username === user.username && password === user.password) {
      return {
        code: 20000,
        data: {
          menu: [{
              path: '/home',
              name: 'home',
              label: '首页',
              icon: 's-home',
            },
            {
              path: '/mall',
              name: 'mall',
              label: '商品管理',
              icon: 'video-play',
            }
          ],
          token: Mock.Random.guid(),
          username: user.username,
          authority: '会员',
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '账号或密码错误'
        }
      }
    }

  },
  updatePassword: config => {
    console.log(config)
    const {
      oldpsd,
      newpsd,
      reppsd
    } = JSON.parse(config.body)
    if (oldpsd === user.password && newpsd === reppsd) {
      user.password = newpsd;
      return {
        code: 20000,
        data: {
          message: '修改密码成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '修改密码失败'
        }
      }
    }
  }
}