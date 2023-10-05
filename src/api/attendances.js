import request from '@/utils/request'
// 查询考勤数据列表
export const getAttendances = (params) => request.get('/attendances', { params })
