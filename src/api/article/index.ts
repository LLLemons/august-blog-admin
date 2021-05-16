/*
 * @Author: Lemon
 * @Date: 2021-05-16 00:45:45
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 01:56:24
 * @FilePath: /august-blog-admin/src/api/article/index.ts
 */

import { httpGet } from '@/utils/request';
import { prefix } from '../config';
import { ArticleNamespace } from './type';

export const queryArticles = (data: ArticleNamespace.RepositoryListQuery) => {
  return httpGet(`${prefix}/article`, data);
};

export const queryArticle = (id: number) => {
  console.log(id);
  return httpGet<ArticleNamespace.ArticleModel>(`${prefix}/article/${id}`);
};
