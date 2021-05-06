import { httpGet, httpPost, httpPut } from "@/utils/request"
import { prefix } from "../config"
import { UserNamespace } from "./type"

/*
 * @Author: Lemon
 * @Date: 2021-05-06 10:26:47
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 18:13:45
 * @FilePath: /august-blog-admin/src/api/user/index.ts
 */
export const register = (data: UserNamespace.registerRequest) => {
  return httpPost<UserNamespace.userInfoResponse>(`${prefix}/user/register`, data)
}

export const login = (data: UserNamespace.loginRequest) => {
  return httpPost<UserNamespace.userInfoResponse>(`${prefix}/user/login`, data)
}

export const getUserInfo = () => {
  return httpGet<UserNamespace.userInfoResponse>(`${prefix}/user/info`)
}

export const updateUserInfo = (data: UserNamespace.userInfo) => {
  return httpPut(`${prefix}/user/${data.id}`, data)
}