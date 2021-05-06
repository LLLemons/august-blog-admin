/*
 * @Author: Lemon
 * @Date: 2021-04-30 09:59:45
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 21:36:29
 * @FilePath: /august-blog-admin/src/pages/components/Repositories/index.tsx
 */
import { queryRepositories } from '@/api/repository'
import { RepositoryNamespace } from '@/api/repository/type'
import { jumpToRepositoryPage } from '@/pages/repository'
import { httpGet, httpPost } from '@/utils/request'
import { useRequest } from 'ahooks'
import { Button, Col, Form, Input, Pagination, Row, Table } from 'antd'
import { ColumnsType, TablePaginationConfig } from 'antd/lib/table'
import React, { useEffect, useState } from 'react'
import CreateModal from './components/CreateModal'
import style from './style.less'

export interface RepositoriesProps {

}

const Repositories:React.FC<RepositoriesProps> = props => {
  const { run, loading, pagination, data } = useRequest(params => queryRepositories({
    pageNo: params.current,
    pageSize: params.pageSize
  }), {
    paginated: true,
    manual: true,
    formatResult: (data) => {
      if (data.status >=200 && data.status < 300) {
        return data.data
      }
      return {
        list: [],
        total: 0
      }
    },
    initialData: {
      list: [],
      total: 0
    }
  })
  const columns: ColumnsType<RepositoryNamespace.RepositoryModel> = [
    {
      dataIndex: 'title',
      title: '标题',
      align: 'center',
    },
    {
      dataIndex: 'description',
      title: '概要',
      align: 'center',
    },
    {
      dataIndex: 'createdAt',
      title: '创建时间',
      align: 'center',
    },
    {
      dataIndex: 'updatedAt',
      title: '修改时间',
      align: 'center'
    },
    {
      dataIndex: 'actions',
      title: '操作',
      align: 'center',
      render: (v, r, i) => {
        return <>
          <a>修改</a>
          <a className="ml5" onClick={() => jumpToRepositoryPage({id: r.id.toString()})}>详情</a>
        </>
      }
    }
  ]
  const handleCreate = () => {
    queryRepositories({
      pageNo: 1, 
      pageSize: 10
    })
  }
  const handleSearch = () => {
    run({
      current: pagination.current,
      pageSize: pagination.pageSize
    })
  }
  useEffect(() => {
    run({
      current: 1,
      pageSize: 10
    })
  }, [])
  useEffect(() => {
    console.log(data, 'run')
  }, [data])
  return <div className={`layout1058 mt20`}>
    <Form>
      <Row gutter={24}>
        <Col span={4}>
          <Form.Item name='search'>
            <Input placeholder="在仓库中搜索" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item>
            <Button onClick={handleSearch}>搜索</Button>
          </Form.Item>
        </Col>
        <Col flex={1} style={{display: 'flex', justifyContent: 'flex-end'}}>
          <Form.Item>
            <CreateModal onOk={handleCreate}>
              <Button type="primary">创建</Button>
            </CreateModal>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    <Table loading={loading} columns={columns} pagination={{
      pageSize: pagination.pageSize,
      current: pagination.current + 1,
      showQuickJumper: true,
      showSizeChanger: true,
      onChange: (page, pageSize) => pagination.onChange(page, pageSize || pagination.pageSize)
    }} bordered size="small" locale={{emptyText: '暂无数据'}} dataSource={data?.list} />
  </div>
}
export default Repositories