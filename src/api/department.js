import request from '@/utils/request'

/** 获取部门列表 */
export const getDepartmentList = () => request.get('/company/department')
/** 部门负责人列表 */
export const getManagerList = () => request.get('/sys/user/simple')
/**
 *新增-部门
 * @param {*} data
 * @returns
 */

export const addDepartment = (data) => request.post('/company/department', data)

