/*
 * @Author: Lemon
 * @Date: 2021-05-06 21:28:48
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 22:15:42
 * @FilePath: /august-blog-admin/src/pages/repository/index.tsx
 */
import { queryRepositories, queryRepository } from '@/api/repository';
import { Avatar, Button, Card } from 'antd';
import React, { useEffect } from 'react';
import { history, useRequest } from 'umi';

interface Query {
  id: string;
}

export const jumpToRepositoryPage = (query: Query) => {
  history.push({
    pathname: '/repository',
    query: {
      id: query.id,
    },
  });
};

export interface RepositoryProps {
  location: {
    query: Query;
  };
}

const Repository: React.FC<RepositoryProps> = (props) => {
  console.log(props.location.query.id);
  const { data, run } = useRequest(queryRepository, {
    manual: true,
    formatResult: (data) => {
      return data.data;
    },
    initialData: {
      user: {},
    },
  });
  useEffect(() => {
    run(+props.location.query.id);
  }, []);
  return (
    <div>
      <div className="brb bgcwhite">
        <div className="layout1058">
          <div className="flex-between" style={{ height: 55 }}>
            <div className="flex-left">
              <Avatar src={<img src={data.user.avatar} />} />
              <div className="ml5">{data.title}</div>
            </div>
            <div className="flex-left">
              <Button type="primary">新建</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="layout1058 mt30">
        <Card>
          <div className="flex-column flex-center">
            <h3>{data.title}</h3>
            <div>{data.description}</div>
            <Avatar src={<img src={data.user.avatar} />} />
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Repository;
