import { useLoaderData, useFetcher } from 'react-router-dom'
import './quickView.scss'
import { QuickViewItem } from '@renderer/components/QuickViewItem'
import { IconPlus, IconHelp } from '@tabler/icons-react'
import { useState } from 'react'

export const QuickView = () => {
  const searchs = useLoaderData() as QuickViewType[]
  const fetcher = useFetcher()
  const [showTooltip, setShowTooltip] = useState(false)

  const addNewRow = async () => {
    await fetcher.submit({}, { method: 'POST' })
  }

  const handleDelete = (id: number) => {
    fetcher.submit({ id }, { method: 'DELETE' })
  }

  return (
    <main className="quickview-page">
      <div className="page-header">
        <div className="header-content">
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            快速访问
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
                  Google搜索配置示例：
                  <br />
                  名称：Google
                  <br />
                  缩写：g
                  <br />
                  链接：https://www.google.com/search?q={'{keyword}'}
                </div>
              )}
            </div>
          </h2>
          <button className="add-btn" onClick={addNewRow}>
            <IconPlus size={16} />
            <span>添加新行</span>
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
          {searchs.map((search) => (
            <QuickViewItem
              key={search.id}
              search={search}
              onDelete={() => handleDelete(search.id)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
