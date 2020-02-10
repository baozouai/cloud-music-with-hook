import { axiosInstance } from './config';

// 获取轮播图
export const getBannerRequest = () => axiosInstance.get('/banner');
// 获取推荐歌单
export const getRecommendListRequest = () => axiosInstance.get('/personalized');
// 获取热门歌手列表
export const getHotSingerListRequest = count => axiosInstance.get(`/top/artists?offset=${count}`);
// 获取歌手列表
export const getSingerListRequest = (category, alpha, count) => axiosInstance.get(`/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`);