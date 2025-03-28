import { useLoaderData, useFetcher } from 'react-router-dom'
import { ToolItem } from '@renderer/components/ToolItem'
import { IconPlus, IconHelp } from '@tabler/icons-react'
import './tools.scss'
import { useState } from 'react'

export const Tools = () => {
  const tools = useLoaderData() as ToolType[]
  const fetcher = useFetcher()
  const [showTooltip, setShowTooltip] = useState(false)

  const addNewTool = async () => {
    await fetcher.submit({}, { method: 'POST' })
  }

  const handleDelete = (id: number) => {
    fetcher.submit({ id }, { method: 'DELETE' })
  }

  return (
    <main className="tools-page">
      <div className="page-header">
        <div className="header-content">
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            工具设置
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <IconHelp
                size={16}
                style={{ marginLeft: '8px', cursor: 'pointer' }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              />
              {showTooltip && (
                <div
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '20px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '5px',
                    fontSize: '12px',
                    width: '300px'
                  }}
                >
                  IP地理位置查询配置示例：
                  <br />
                  名称：IP地理位置
                  <br />
                  缩写：ip
                  <br />
                  链接：http://ip-api.com/json/{'{keyword}'}
                </div>
              )}
            </div>
          </h2>
          <button className="add-btn" onClick={addNewTool}>
            <IconPlus size={16} />
            <span>添加新工具</span>
          </button>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <span className="col-name">名称</span>
          <span className="col-abbr">缩写</span>
          <span className="col-url">链接</span>
          <span className="col-action">操作</span>
        </div>

        <div className="table-body">
          {tools.map((tool) => (
            <ToolItem key={tool.id} tool={tool} onDelete={() => handleDelete(tool.id)} />
          ))}
        </div>
      </div>
    </main>
  )
}
