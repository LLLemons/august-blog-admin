import { PaginationNamespace } from '../common/types';
import { UserNamespace } from '../user/type';

/*
 * @Author: Lemon
 * @Date: 2021-05-06 18:19:40
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 00:39:31
 * @FilePath: /august-blog-admin/src/api/repository/type.ts
 */
export namespace RepositoryNamespace {
  export interface RepositoryModel {
    id: number;
    title: string;
    description?: string;
    user: UserNamespace.userInfo;
    createdTime: string;
    updatedTime: string;
  }
  export interface RepositoryListQuery
    extends PaginationNamespace.PaginationQuery {}
  export type RepositoryListResponse = {
    total: number;
    list: RepositoryModel[];
  };

  export type RepositoryCreateRequest = Omit<
    RepositoryModel,
    'id' | 'createdTime' | 'updatedTime'
  >;
}
