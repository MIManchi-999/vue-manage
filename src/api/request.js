import axios from "axios"
import config from "../config"

//判断是开发环境还是生产环境
const url = process.env.NODE_ENV === 'devlopment' ? config.baseUrl.dev : config.baseUrl.pro

const request = axios.create({
    baseURL: url, //服务器ip + 服务器端口
    timeout: 3000, //等待多少ms
})

// 添加请求拦截器
request.interceptors.request.use(

    (config) => {
        // 在发送请求之前做些什么
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);


// 添加响应拦截器
request.interceptors.response.use(
    (response) => {
        // 2XX 状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
    },
    (error) => {
        // 超出 2xx 范围的状态码都会触发该函数。
        console.log('error', error)
        return Promise.reject(error);
    }
);

export default request