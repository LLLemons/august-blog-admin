import { httpPost } from "@/utils/request"
import { prefix } from "../config"

/*
 * @Author: Lemon
 * @Date: 2021-05-06 17:10:57
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 17:13:47
 * @FilePath: /august-blog-admin/src/api/upload/index.ts
 */
export const upload = (data: FormData) => {
  return httpPost(`${prefix}/upload`, data)
}