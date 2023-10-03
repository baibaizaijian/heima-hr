import request from '@/utils/request'

export const getPermissionList = () => request.get('/sys/permission')
/**
 *删除-权限点
 * @param {*} id
 * @returns
 */
export const delPermission = (id) => request.delete(`/sys/permission/${id}`)
/**
 * 获取-权限点详情
 * @param {*} id
 * @returns
 */
export const getPermission = (id) => request.get(`/sys/permission/${id}`)
/**
 * 新增-权限
 * @param {*} data
 * @returns
 */
export const addPermission = (data) => request.post('/sys/permission', data)
/**
 * 修改-权限点详情
 * @param {*} id
 * @returns
 */
export const putPermission = (data) => request.put(`/sys/permission/${data.id}`, data)
