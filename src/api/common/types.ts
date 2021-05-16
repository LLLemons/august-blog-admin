/*
 * @Author: Lemon
 * @Date: 2021-05-06 18:28:58
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 01:42:07
 * @FilePath: /august-blog-admin/src/api/common/types.ts
 */
export namespace PaginationNamespace {
  export interface PaginationQuery {
    pageNo: number;
    pageSize: number;
  }
  export interface PaginationResponse<T> {
    total: number;
    list: T[];
  }
}
