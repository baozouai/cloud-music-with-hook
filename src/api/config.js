import axios from 'axios';

export const baseUrl = 'http://192.168.1.101:4000';
// axios实例和拦截器设置
const axiosInstance = axios.create({
    baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
    res => res.data,
    err => console.log(err, '网络错误'),
);

export {
    axiosInstance,
}


