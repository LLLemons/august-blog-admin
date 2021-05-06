import { PaginationNamespace } from "../common/types";

/*
 * @Author: Lemon
 * @Date: 2021-05-06 18:19:40
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 19:15:59
 * @FilePath: /august-blog-admin/src/api/repository/type.ts
 */
export namespace RepositoryNamespace {
  export interface RepositoryModel {
    id: number;
    title: string;
    userId: number;
    created_at: string;
    updated_at: string;
  }
  export interface RepositoryListQuery extends PaginationNamespace.PaginationQuery {

  }
  export type RepositoryListResponse = {
    total: number;
    list: RepositoryModel[]
  }

  export type RepositoryCreateRequest = Omit<RepositoryModel, 'id' | 'created_at' | 'updated_at'>
}