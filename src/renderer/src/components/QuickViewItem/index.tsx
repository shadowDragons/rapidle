import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { useFetcher } from 'react-router-dom'
import './quickViewItem.scss'

export const QuickViewItem = ({ search, onDelete }: { search: any; onDelete: any }) => {
  const [form] = Form.useForm()
  const [isEditing, setIsEditing] = useState(false)
  const fetcher = useFetcher()

  const handleSubmit = (values) => {
    fetcher.submit({ ...values, id: search.id }, { method: 'PUT' })
    setIsEditing(false)
  }

  return (
    <div className="search-item">
      <Form form={form} initialValues={search} onFinish={handleSubmit} className="search-form">
        <Form.Item name="name" className="name">
          <Input readOnly={!isEditing} onDoubleClick={() => setIsEditing(true)} />
        </Form.Item>
        <Form.Item name="abbr" className="abbr">
          <Input readOnly={!isEditing} onDoubleClick={() => setIsEditing(true)} />
        </Form.Item>
        <Form.Item name="url" className="url">
          <Input readOnly={!isEditing} onDoubleClick={() => setIsEditing(true)} />
        </Form.Item>
        <div className="actions">
          {isEditing ? (
            <Button htmlType="submit" type="primary" icon={<SaveOutlined />} />
          ) : (
            <Button danger onClick={onDelete} icon={<DeleteOutlined />} />
          )}
        </div>
      </Form>
    </div>
  )
}
