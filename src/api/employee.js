import request from '@/utils/request'
/**
 *获取分页,员工列表
 * @returns
 */
export const getEmployeeList = (params) => request.get('/sys/user', { params })
