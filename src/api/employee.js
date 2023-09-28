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

/**
 * 批量-下载导入员工模板
 * @returns
 */
export const exportTemplate = () => request.get('/sys/user/import/template', { responseType: 'blob' })
/**
 *批量-导入员工(上传excel)
 * @param {*} data
 * @returns
 */

export const importExcel = (data) => request.post('/sys/user/import', data)

/**
 * 删除员工
 * @param {*} id
 * @returns
 */

export const delEmployee = (id) => request.delete(`/sys/user/${id}`)
// 新增员工
export const addEmployee = (data) => request.post(`/sys/user`, data)
// 获取-员工-基本信息
export const getEmployee = (id) => request.get(`/sys/user/${id}`)
// 修改-员工-基本信息
export const updateEmployee = (data) => request.put(`/sys/user/${data.id}`, data)

