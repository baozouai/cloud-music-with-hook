import axios from 'axios';

export const baseUrl = 'http://';
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


