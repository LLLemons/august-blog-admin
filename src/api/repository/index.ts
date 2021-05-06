/*
 * @Author: Lemon
 * @Date: 2021-05-06 18:19:34
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 21:52:49
 * @FilePath: /august-blog-admin/src/api/repository/index.ts
 */

import { httpGet, httpPost } from "@/utils/request"
import { prefix } from "../config"
import { RepositoryNamespace } from "./type"

export const queryRepositories = (data: RepositoryNamespace.RepositoryListQuery) => {
  return httpGet(`${prefix}/repository`, data)
}

export const createRepository = (data: RepositoryNamespace.RepositoryCreateRequest) => {
  return httpPost(`${prefix}/repository`, data)
}

export const queryRepository = (id: number) => {
  console.log(id)
  return httpGet(`${prefix}/repository/${id}`)
}