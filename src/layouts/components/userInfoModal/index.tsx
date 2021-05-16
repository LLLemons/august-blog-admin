/*
 * @Author: Lemon
 * @Date: 2021-04-30 17:13:24
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-15 15:10:14
 * @FilePath: /august-blog-admin/src/layouts/components/userInfoModal/index.tsx
 */
import { login, register, updateUserInfo } from '@/api/user';
import { UserNamespace } from '@/api/user/type';
import BaseUpload from '@/components/upload';
import Index from '@/pages/components/Index';
import { httpGet, httpPost } from '@/utils/request';
import { Modal, Form, Input } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import React, { useEffect, useState } from 'react';

export interface UserInfoModalProps {
  userInfo?: Partial<UserNamespace.userInfo>;
  type: 'login' | 'register' | 'update' | 'info';
  onOK: () => void;
  visible?: boolean;
}

enum BtnStatusMap {
  login = '登陆',
  register = '注册',
  update = '更新',
  info = '查看',
}

const UserInfoModal: React.FC<UserInfoModalProps> = (props) => {
  const { type, onOK } = props;
  const [visible, setVisible] = useState(false);
  const [form] = useForm<UserNamespace.userInfo>();
  const handleOk = async () => {
    const data = form.getFieldsValue();
    await form.validateFields();
    switch (type) {
      case 'register':
        await register(data);
        setVisible(false);
        form.resetFields();
        onOK();
        return;
      case 'login':
        await login(data);
        setVisible(false);
        form.resetFields();
        onOK();
        return;
      case 'update':
        await updateUserInfo(data);
        setVisible(false);
        form.resetFields();
        onOK();
        return;
      default:
        return '';
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  useEffect(() => {
    props.userInfo && form.setFieldsValue(props.userInfo);
  }, [props.userInfo]);
  return (
    <>
      <span onClick={() => setVisible(true)}>{props.children}</span>
      <Modal
        visible={visible}
        title={BtnStatusMap[type]}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name="id" style={{ display: 'none' }}></Form.Item>
          <Form.Item name="email" rules={[{ required: true }]} label="邮箱">
            <Input placeholder="邮箱" disabled={type === 'update'} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: type === 'update' ? false : true }]}
            label="密码"
          >
            <Input placeholder="密码" />
          </Form.Item>
          <Form.Item
            style={{ display: type === 'login' ? 'none' : '' }}
            name="avatar"
            rules={[{ required: false }]}
            label="头像"
          >
            <BaseUpload listType="picture-card" multiple={false} maxCount={1}>
              +upload
            </BaseUpload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserInfoModal;
