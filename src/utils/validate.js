/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 * 传入地址
 * 它用于判断给定的路径是否为外部链接。
 */

/* 函数的逻辑是使用正则表达式来检测路径是否以 http:、https:、mailto:
   或 tel: 开头，如果是，则返回 true，表示是外部链接；否则返回 false，表示不是外部链接。 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 * 它用于验证给定的字符串是否为有效的用户名。
 */
/* 函数的逻辑是首先定义了一个名为 valid_map 的数组，其中包含了一些有效的用户名。
然后，函数会将输入的字符串使用 trim() 方法去除首尾空格，
并通过 indexOf() 方法来查找该字符串在 valid_map 数组中的索引。
如果索引大于等于0，则说明输入的字符串是一个有效的用户名，
函数会返回 true，否则返回 false。 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
