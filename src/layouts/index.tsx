/*
 * @Author: Lemon
 * @Date: 2021-04-30 11:31:05
 * @LastEditors: Lemon
 * @LastEditTime: 2021-04-30 16:49:05
 * @FilePath: /august-blog-admin/src/layouts/index.tsx
 */
import React from 'react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import Header from './components/Header';

export interface IndexLayoutProps {

}

const IndexLayout:React.FC<IndexLayoutProps> = props => {
  return <ConfigProvider locale={zhCN}>
    <Header />
    <div>{props.children}</div>
  </ConfigProvider>
}
export default IndexLayout