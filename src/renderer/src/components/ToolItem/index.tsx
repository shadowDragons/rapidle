import React, { useState } from 'react'
import { Input, Button, Form } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useFetcher } from 'react-router-dom'
import './toolItem.scss'

interface ToolItemProps {
  tool: ToolType
  onDelete: () => void
}

export const ToolItem: React.FC<ToolItemProps> = ({ tool, onDelete }) => {
  const [form] = Form.useForm()
  const fetcher = useFetcher()
  const [editingField, setEditingField] = useState<string | null>(null)

  const handleDoubleClick = (field: string) => {
    setEditingField(field)
  }

  const handleBlur = () => {
    if (editingField) {
      const values = form.getFieldsValue()
      fetcher.submit({ id: tool.id, ...values }, { method: 'PUT' })
      setEditingField(null)
    }
  }

  return (
    <div className="tool-item">
      <Form form={form} initialValues={tool} className="tool-form">
        <Form.Item name="name" className="name">
          <Input
            readOnly={editingField !== 'name'}
            onDoubleClick={() => handleDoubleClick('name')}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item name="abbr" className="abbr">
          <Input
            readOnly={editingField !== 'abbr'}
            onDoubleClick={() => handleDoubleClick('abbr')}
            onBlur={handleBlur}
          />
        </Form.Item>
        <Form.Item name="url" className="url">
          <Input
            readOnly={editingField !== 'url'}
            onDoubleClick={() => handleDoubleClick('url')}
            onBlur={handleBlur}
          />
        </Form.Item>
        <div className="actions">
          <Button onClick={onDelete} icon={<DeleteOutlined />} danger />
        </div>
      </Form>
    </div>
  )
}
