/*
 * @Author: Lemon
 * @Date: 2021-04-30 17:25:39
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-13 17:42:29
 * @FilePath: /august-blog-admin/src/components/upload/index.tsx
 */
import { getToken } from '@/utils/token';
import { Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';
import style from './style.less';

export interface BaseUploadProps
  extends Omit<UploadProps, 'fileList' | 'headers' | 'onChange'> {
  value?: string;
  onChange?: (v: string) => void;
}
const getName = (value?: string): string => {
  const arr = value && value.split('/');
  const name = arr && arr[arr.length - 1];
  return name || '';
};
const BaseUpload: React.FC<BaseUploadProps> = (props) => {
  const [fileList, setFileList] = useState<any[]>();
  useEffect(() => {
    console.log(props.value, 'props.value----');
    if (props.value) {
      setFileList([
        {
          uid: '1',
          name: getName(props.value),
          url: props.value,
          status: 'done',
        },
      ]);
    } else {
      setFileList([]);
    }
  }, [props.value]);
  return (
    <Upload
      action="http://localhost:8000/api/v1/upload"
      {...props}
      fileList={fileList}
      headers={{ Authorization: `${getToken()}` }}
      onChange={({ fileList }) => {
        console.log(fileList);
        setFileList(fileList);
        if (fileList?.[0]?.status === 'done') {
          props.onChange?.(fileList[0].response ?? '');
        }
      }}
    >
      {props.children}
    </Upload>
  );
};
export default BaseUpload;
