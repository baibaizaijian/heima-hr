import request from '@/utils/request'

export const getPermissionList = () => request.get('/sys/permission')
/**
 *删除-权限点
 * @param {*} id
 * @returns
 */
export const delPermission = (id) => request.delete(`/sys/permission/${id}`)
