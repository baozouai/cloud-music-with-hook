import { axiosInstance } from './config';

// 获取轮播图
export const getBannerRequest = () => axiosInstance.get('/banner');
// 获取推荐歌单
export const getRecommendListRequest = () => axiosInstance.get('/personalized');