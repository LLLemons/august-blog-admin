/*
 * @Author: Lemon
 * @Date: 2021-05-06 18:19:34
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 01:50:32
 * @FilePath: /august-blog-admin/src/api/repository/index.ts
 */

import { httpGet, httpPost } from '@/utils/request';
import { ArticleNamespace } from '../article/type';
import { prefix } from '../config';
import { RepositoryNamespace } from './type';

export const queryRepositories = (
  data: RepositoryNamespace.RepositoryListQuery,
) => {
  return httpGet(`${prefix}/repository`, data);
};

export const createRepository = (
  data: RepositoryNamespace.RepositoryCreateRequest,
) => {
  return httpPost(`${prefix}/repository`, data);
};

export const queryRepository = (id: number) => {
  console.log(id);
  return httpGet<
    RepositoryNamespace.RepositoryModel & {
      articles: ArticleNamespace.ArticleModel[];
    }
  >(`${prefix}/repository/${id}`);
};
