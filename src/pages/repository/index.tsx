/*
 * @Author: Lemon
 * @Date: 2021-05-06 21:28:48
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 01:55:02
 * @FilePath: /august-blog-admin/src/pages/repository/index.tsx
 */
import { queryRepositories, queryRepository } from '@/api/repository';
import { Avatar, Button, Card } from 'antd';
import React, { useEffect } from 'react';
import { history, useRequest } from 'umi';
import { jumpToEditorPage } from '../editor';
import moment from 'moment';

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
  });
  const handleCreate = () => {
    jumpToEditorPage({
      id: props.location.query.id,
    });
  };
  const handleEdit = (aId: any) => {
    jumpToEditorPage({
      id: props.location.query.id,
      aId,
    });
  };
  useEffect(() => {
    run(+props.location.query.id);
  }, []);
  return (
    <div>
      <div className="brb bgcwhite">
        <div className="layout1058">
          <div className="flex-between" style={{ height: 55 }}>
            <div className="flex-left">
              <Avatar src={<img src={data?.user.avatar} />} />
              <div className="ml5">{data?.title}</div>
            </div>
            <div className="flex-left">
              <Button type="primary" onClick={handleCreate}>
                新建
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="layout1058 mt30">
        <Card>
          <div className="flex-column flex-center">
            <h3>{data?.title}</h3>
            <div className="mb20">{data?.description}</div>
            <Avatar src={<img src={data?.user.avatar} />} />
            <div className="mt20">
              {data?.articles.map((item) => (
                <a onClick={() => handleEdit(item.id)}>
                  {item.title}----
                  {moment(item.updatedTime).format('YYYY-MM-DD HH:mm:ss')}
                </a>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default Repository;
