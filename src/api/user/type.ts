/*
 * @Author: Lemon
 * @Date: 2021-05-06 13:46:52
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 14:13:53
 * @FilePath: /august-blog-admin/src/api/user/type.ts
 */
export namespace UserNamespace {
  export interface userInfo {
    email: string;
    password: string;
    avatar: string;
    id: number;
  }
  export type registerRequest = Omit<userInfo, 'id'>
  export type loginRequest = Omit<userInfo, 'id' | 'avatar'>
  export type userInfoResponse = Omit<userInfo, 'password'>
}