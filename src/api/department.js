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

/**
 * 获取详情
 * @param {*} id
 * @returns
 */
export const getDepartmentDetail = id => request.get(`/company/department/${id}`)
/**
 *编辑部门
 * @param {*} data
 * @returns
 */
export const updateDepartment = data => request.put(`/company/department/${data.id}`, data)

/**
 *
 * @param {*} data
 * @returns
 */
export const delDepartment = (id) => request.delete(`/company/department/${id}`)

