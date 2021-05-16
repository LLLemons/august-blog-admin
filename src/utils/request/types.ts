/*
 * @Author: Lemon
 * @Date: 2021-04-30 16:38:30
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 00:42:23
 * @FilePath: /august-blog-admin/src/utils/request/types.ts
 */

import { AxiosResponse } from 'axios';

export namespace Basic {
  export interface BaseProps<T = any> {
    location: Location & { query: T };
  }
  export interface BaseResponse<T = any> extends AxiosResponse<T> {}
}
