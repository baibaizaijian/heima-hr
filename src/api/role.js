import request from '@/utils/request'
/**
 *获取分页查询角色列表
 * @returns
 */
export const getRoleList = (params) => request.get('/sys/role', { params })
/**
 * 获取-角色详情
 * @param {*} id
 * @returns
 */
export const getRole = (id) => request.get(`/sys/role${id}`)
/**
 *新增角色
 * @returns
 */
export const addRole = () => request.post('/sys/role')
/**
 * 删除角色
 * @param {*} id
 * @returns
 */
export const delRole = (id) => request.post(`/sys/role${id}`)
/**
 * 修改-角色
 * @param {*} id
 * @returns
 */
export const putRole = (id) => request.put(`/sys/role${id}`)
/**
 * 分配权限-角色
 * @param {*} id
 * @returns
 */

export const assignRole = (data) => request.put(`/sys/role/assignPrem`, data)
/**
 * 获取-已启用的角色列表
 * @returns
 */
export const enabledRole = () => request.get(`/sys/role/list/enabled`)
