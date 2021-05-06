/*
 * @Author: Lemon
 * @Date: 2021-04-30 11:20:52
 * @LastEditors: Lemon
 * @LastEditTime: 2021-05-06 19:16:56
 * @FilePath: /august-blog-admin/src/pages/components/Repositories/components/CreateModal/index.tsx
 */
import { createRepository } from '@/api/repository'
import BaseUpload from '@/components/upload'
import { httpPost } from '@/utils/request'
import { Form, Input, Modal, Button } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import React, { useState } from 'react'

export interface CreateModalProps {
  onOk: () => void
}

const CreateModal:React.FC<CreateModalProps> = props => {
  const [form] = useForm()
  const [visible, setVisible] = useState(false)
  const handleCLick = () => {
    setVisible(true)
  }
  const handleOk = async () => {
    await createRepository(form.getFieldsValue())
    props.onOk()
    setVisible(false)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const handleCreate = () => {
    
  }
  return <>
    <span onClick={handleCLick}>{props.children}</span>
    <Modal visible={visible} title="创建仓库" okText="创建仓库" onOk={handleOk} onCancel={handleCancel}>
      <Form form={form}>
        <Form.Item name="title" label="名称" rules={[{ required: true }]}>
          <Input placeholder='请输入仓库名'  />
        </Form.Item>
        <Form.Item name="description" label="描述" rules={[{ required: true }]}>
          <Input placeholder='请输入仓库描述'  />
        </Form.Item>
        <Form.Item name="cover" label="封面">
          <BaseUpload listType="picture-card" multiple={false} maxCount={1}>+upload</BaseUpload>
        </Form.Item>
      </Form>
    </Modal>
  </>
}
export default CreateModal