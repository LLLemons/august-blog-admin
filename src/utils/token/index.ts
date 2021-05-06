/*
 * @Author: Lemon
 * @Date: 2021-04-30 17:41:20
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 10:14:53
 * @FilePath: /august-blog-admin/src/utils/token/index.ts
 */
import Cookies from 'js-cookie';
/**
 * @customerName 获取token
 */
export function getToken() {
  return Cookies.get('authenticationToken') ? `Bearer ${Cookies.get('authenticationToken')}` : '';
}
/**
 *
 * @param {string} token
 */
export function setToken(token: string) {
  Cookies.set('authenticationToken', token);
}