/*
 * @Author: Lemon
 * @Date: 2021-04-30 11:31:05
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 00:57:00
 * @FilePath: /august-blog-admin/src/layouts/index.tsx
 */
import React from 'react';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import Header from './components/Header';

export interface IndexLayoutProps {
  location: {
    pathname: string;
    search: string;
  };
}

const IndexLayout: React.FC<IndexLayoutProps> = (props) => {
  const excludePath = ['/editor'];
  return (
    <ConfigProvider locale={zhCN}>
      {!excludePath.includes(props.location.pathname) && <Header />}
      <div>{props.children}</div>
    </ConfigProvider>
  );
};
export default IndexLayout;
