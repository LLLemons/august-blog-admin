import { Tabs } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Home from '../Home';
import Repositories from '../Repositories';
import Statistics from '../Statistics';
import style from './style.less';

export interface IndexProps {
}

const Index: React.FC<IndexProps> = (props) => {
  const [currentTab, setCurrentTab] = useState('repositories');
  const tabs = [
    {
      tab: '首页',
      key: 'index',
      components: <Home />,
    },
    {
      tab: '仓库',
      key: 'repositories',
      components: <Repositories />,
    },
    {
      tab: '数据统计',
      key: 'statistics',
      components: <Statistics />,
    },
  ];
  useEffect(() => {
  }, [])
  return (
    <div className={`${style.wrapper}`}>
      <div className={`${style.top} brb`}>
        <div className={style.content}>
          <div className="flex flex-left mt28">
            <div className={style.avatar}>A</div>
            <div className="flex flex-column ml24">
              <div className={style.name}>August</div>
              <div className={style.subName}>这是august的空间</div>
            </div>
          </div>
          <Tabs activeKey={currentTab} onChange={setCurrentTab}>
            {tabs.map((item) => <Tabs.TabPane tab={item.tab} key={item.key} />)}
          </Tabs>
        </div>
      </div>
      <div className={style.main}>
        {
          tabs.find(item => item.key === currentTab)?.components
        }
      </div>
    </div>
  );
};
export default Index;
