import request from '@/utils/request'
/**
 *获取分页,员工列表
 * @returns
 */
export const getEmployeeList = (params) => request.get('/sys/user', { params })
/**
 * 批量-导出员工excel
 * @returns
 */

export const exportExcel = () => request.get('/sys/user/export', { responseType: 'blob' })
