/*
 * @Author: Lemon
 * @Date: 2021-05-13 18:57:28
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-16 16:28:04
 * @FilePath: /august-blog-admin/src/pages/Editor/index.tsx
 */
import { queryArticle } from '@/api/article';
import { ArticleNamespace } from '@/api/article/type';
import { queryRepository } from '@/api/repository';
import Editor from '@/components/editor';
import { getToken } from '@/utils/token';
import { message } from 'antd';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { history, useRequest } from 'umi';
import { jumpToRepositoryPage } from '../repository';

interface Query {
  id: string;
  aId?: string;
}

export const jumpToEditorPage = (query: Query) => {
  history.push({
    pathname: '/editor',
    query: {
      id: query.id,
      aId: query.aId || '',
    },
  });
};

export interface EditorPageProps {
  location: {
    query: Query;
  };
}

const EditorPage: React.FC<EditorPageProps> = (props) => {
  const { data: repository, run: queryRepositoryInfo } = useRequest(
    queryRepository,
    {
      manual: true,
      formatResult: (data) => {
        return data.data;
      },
    },
  );
  const ws = useRef<Socket | null>(null);
  const [content, setContent] = useState('');
  const [article, setArticle] = useState<ArticleNamespace.ArticleModel | null>(
    null,
  );

  useEffect(() => {
    queryRepositoryInfo(+props.location.query.id);
    if (props.location.query.aId) {
      queryArticle(+props.location.query.aId).then(({ data }) => {
        setArticle(data);
        console.log(data.content, '------');
        setContent(data.content);
      });
    }
  }, []);

  useLayoutEffect(() => {
    ws.current = io('ws://127.0.0.1:7001/content', {
      query: {
        rId: props.location.query.id,
        aId: props.location.query.aId || '',
      },
      path: '/editor',
      auth: {
        token: getToken(),
      },
    });
    ws.current.on('saveResult', ({ success, article: art }) => {
      console.log(art, success, 'data');
      if (!success) {
        ws.current?.close();
        return;
      }
      setArticle({
        ...article,
        ...art,
      });
    });
    ws.current.on('disconnect', () => {
      console.log('与服务器断开');
    });
    ws.current.on('reconnect', () => {
      console.log('重新连接到服务器');
    });
    return () => {
      ws.current?.close();
    };
  }, [ws]);

  const handleToRepositoryPage = () => {
    jumpToRepositoryPage({
      id: props.location.query.id,
    });
  };

  return (
    <>
      <div style={{ height: 40 }} className="flex-left bgcwhite pl20">
        <div>
          <a onClick={handleToRepositoryPage}>{repository?.title}</a>/
          {article?.title ?? '--'}/已自动保存最后更改于{article?.updatedTime}
        </div>
      </div>
      <Editor
        value={content}
        onChange={(value: any) => {
          console.log(value, '----oo');
          ws.current?.emit('save', value);
        }}
      />
    </>
  );
};
export default EditorPage;
