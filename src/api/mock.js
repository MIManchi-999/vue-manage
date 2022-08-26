import Mock from 'mockjs'
import homeApi from './mockSaveData/home'
import userApi from './mockSaveData/user'
import permissionApi from './mockSaveData/permission'
import mallApi from './mockSaveData/mall'

//不加请求类型就是默认get
Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock('/home/getTableData', homeApi.getTableData)

Mock.mock('/user/add', 'post', userApi.createUser)
Mock.mock('/user/update', 'post', userApi.updateUser)
// 通过get请求接受数据的用正则url接受
Mock.mock(/\/user\/getUsers/, userApi.getUserList)
Mock.mock(/\/user\/deleteUser/, userApi.deleteUser)

Mock.mock('/permission/getUserInfo', 'post', permissionApi.getUserInfo)
Mock.mock('/permission/updatePassword', 'post', permissionApi.updatePassword)

Mock.mock(/\/mall\/getGoods/, mallApi.getGoods)
Mock.mock(/\/mall\/delGoods/, mallApi.delGoods)
Mock.mock(/\/mall\/clearAll/, mallApi.clearAll)