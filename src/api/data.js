import request from "./request"

export const getData = () => {
    return request({
        url: '/home/getData',
        method: 'get',
    })
}

export const getTableData = () => {
    return request({
        url: '/home/getTableData',
        method: 'get'
    })
}

export const createUser = (param) => {
    return request({
        url: '/user/add',
        method: 'post',
        data: param
    })
}

export const updateUser = (param) => {
    return request({
        url: '/user/update',
        method: 'post',
        data: param
    })
}

export const getUsers = (params) => {
    return request({
        url: '/user/getUsers',
        method: 'get',
        params
    })
}

export const deleteUser = (params) => {
    return request({
        url: '/user/deleteUser',
        method: 'get',
        params
    })
}

export const getUserInfo = (param) => {
    return request({
        url: '/permission/getUserInfo',
        method: 'post',
        data: param
    })
}

export const updatePassword = (param) => {
    return request({
        url: '/permission/updatePassword',
        method: 'post',
        data: param
    })
}

export const getGoods = (params) => {
    return request({
        url: '/mall/getGoods',
        method: 'get',
        params
    })
}

export const delGoods = (params) => {
    return request({
        url: '/mall/delGoods',
        method: 'get',
        params
    })
}

export const clearAll = () => {
    return request({
        url: '/mall/clearAll',
        method: 'get'
    })
}