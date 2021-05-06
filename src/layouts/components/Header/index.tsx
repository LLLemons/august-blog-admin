/*
 * @Author: Lemon
 * @Date: 2021-04-30 16:44:52
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 18:15:36
 * @FilePath: /august-blog-admin/src/layouts/components/Header/index.tsx
 */
import { getUserInfo } from '@/api/user';
import { UserNamespace } from '@/api/user/type';
import { httpGet } from '@/utils/request';
import { Avatar, Button, Dropdown, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import UserInfoModal from '../userInfoModal';
import style from './style.less';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const [userInfo, setUserInfo] = useState<UserNamespace.userInfoResponse>();
  
  const handleOk = async () => {
    const data = await getUserInfo()
    setUserInfo(data.data)
  };
  
  const menu = (
    <Menu>
      <Menu.Item>
        <UserInfoModal userInfo={userInfo} type="update" onOK={handleOk}>
          修改个人资料
        </UserInfoModal>
      </Menu.Item>
      <Menu.Item>
        <UserInfoModal type="register" onOK={handleOk}>
          注册
        </UserInfoModal>
      </Menu.Item>
    </Menu>
  );


  useEffect(() => {
    getUserInfo().then((res) => {
      if (res.status === 200) {
        setUserInfo(res.data);
      }
    });
  }, []);
  return (
    <div className={`${style.wrapper} brb`}>
      <div className="layout1058 flex-right">
        {!(userInfo && userInfo.id) ? (
          <>
            <UserInfoModal type="login" onOK={handleOk}>
              <Button type="primary">登陆</Button>
            </UserInfoModal>
            <UserInfoModal type="register" onOK={handleOk}>
              <Button className="ml10">注册</Button>
            </UserInfoModal>
          </>
        ) : (
          <Dropdown overlay={menu} placement="bottomLeft">
            <Avatar
              size={'large'}
              style={{cursor: 'pointer'}}
              src={<img src={userInfo.avatar} />}
            />
          </Dropdown>
        )}
      </div>
    </div>
  );
};
export default Header;
