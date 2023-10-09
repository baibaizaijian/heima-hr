import request from '@/utils/request'
/**
 * 首页信息
 * @returns
 */
export const getHomeData = () => request.get('/home/data')

export const getNotice = () => request.get('/home/notice')
