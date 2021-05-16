import { PaginationNamespace } from '../common/types';

/*
 * @Author: Lemon
 * @Date: 2021-05-16 00:45:55
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 01:42:34
 * @FilePath: /august-blog-admin/src/api/article/type.ts
 */
export namespace ArticleNamespace {
  export interface ArticleModel {
    id: number;
    title: string;
    content: string;
    createdTime: string;
    updatedTime: string;
  }
  export interface RepositoryListQuery
    extends PaginationNamespace.PaginationQuery {}
  export interface RepositoryListResponse
    extends PaginationNamespace.PaginationResponse<ArticleModel> {}
}
