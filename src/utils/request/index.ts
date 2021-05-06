import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message, Modal } from 'antd';
import { Basic } from './types';
import { getToken, setToken } from '../token';
axios.interceptors.request.use(
  req => {
    if (getToken()) {
      req.headers.Authorization = getToken()
    }
    return req;
  },
  error => {
    return Promise.resolve(error);
  },
);
axios.interceptors.response.use(
  response => {
    if (response.headers['access-token']) {
      setToken(
        response.headers['access-token'],
      );
    }
    return response;
  },
  error => {
    if (axios.isCancel(error)) {
      const response = {
        config: {},
        headers: {},
        status: -999,
        statusText: '中断请求',
        data: undefined,
      };
      return Promise.resolve(response);
    }
    return Promise.resolve(error.response);
  },
);
export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
export interface RequestParams {
  method: Method | string;
  url: string;
  payload?: any;
}
export function httpGet<T = any>(
  url: string,
  data?: any,
  options?: AxiosRequestConfig,
) {
  return httpRequest<T>({
    url,
    payload: data,
    method: Method.GET,
    ...options,
  } as any);
}
export function httpPost<T>(
  url: string,
  data?: any,
  options?: AxiosRequestConfig,
) {
  return httpRequest<T>({
    url,
    payload: data,
    method: Method.POST,
    ...options,
  } as any);
}
export function httpPut<T>(
  url: string,
  data?: any,
  options?: AxiosRequestConfig,
) {
  return httpRequest<T>({
    url,
    payload: data,
    method: Method.PUT,
    ...options,
  });
}
export function httpDelete<T>(url: string, data?: any) {
  return httpRequest<T>({
    url,
    payload: data,
    method: Method.DELETE,
  });
}
export function httpRequest<T>(
  req: RequestParams,
){
  return request<T>({
    ...req,
    [req.method === Method.GET || req.method === Method.DELETE
      ? 'params'
      : 'data']: req.payload,
  } as AxiosRequestConfig)
}
export default function request<T>(options: AxiosRequestConfig):Promise<Basic.BaseResponse<T>> {
  return axios(options).then(res => {
    const errorMsg = getErrorMessage(res.status);
    if (errorMsg) {
      message.error(`错误代码：${res.status} ，${errorMsg}`);
    }
    return res
  });
}

export function getErrorMessage(statusCode: number): string | undefined {
  const statusMsgMap = {
    400: 'Bad Request/错误请求!',
    401: 'Unauthorized/未授权!',
    403: 'Forbidden/禁止!',
    404: 'Not Found/未找到资源!',
    405: 'Method Not Allowed/方法未允许!',
    406: 'Not Acceptable/无法访问!',
    407: 'Proxy Authentication Required/代理服务器认证要求!',
    408: 'Request Timeout/请求超时!',
    409: 'Conflict/冲突!',
    410: 'Gone/已经不存在!',
    417: 'Expectation Failed/请求头信息期望失败!',
    500: 'Internal Server Error/内部服务器错误!！',
    501: 'Not Implemented/未实现!',
    502: 'Bad Gateway/错误的网关!`',
    503: 'Service Unavailable/服务无法获得!',
    504: 'Gateway Timeout/网关超时!',
    505: 'HTTP Version Not Supported/不支持的 HTTP 版本!'
  } as Record<string, string>;
  return statusMsgMap[statusCode];
}