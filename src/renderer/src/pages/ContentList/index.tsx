import { useLoaderData, Outlet, useLocation, useSubmit } from 'react-router-dom'
import { ContentItem } from '@renderer/components/ContentItem'
import { IconPlus, IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import './contentList.scss'

export const ContentList = () => {
  const contents = useLoaderData() as ContentType[]
  const location = useLocation()
  const submit = useSubmit()
  const showingContent = location.pathname.includes('/content/')
  const [searchText, setSearchText] = useState('')

  const handleAddContent = () => {
    const categoryId = location.pathname.split('/').pop() || '0'
    submit({ category_id: categoryId }, { method: 'POST' })
  }

  const filteredContents = contents.filter(
    (content) =>
      content.title.toLowerCase().includes(searchText.toLowerCase()) ||
      content.content.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="content-list">
      <div className="list-container" style={{ display: showingContent ? 'none' : 'block' }}>
        <div className="list-header">
          <div className="search-box">
            <IconSearch size={16} className="search-icon" />
            <input
              type="text"
              placeholder="搜索片段..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <button className="add-content-btn" onClick={handleAddContent}>
            <IconPlus size={16} />
            <span>新建片段</span>
          </button>
        </div>
        {filteredContents.map((content) => (
          <ContentItem key={content.id} content={content} />
        ))}
      </div>
      <div className="content-container" style={{ display: showingContent ? 'block' : 'none' }}>
        <Outlet />
      </div>
    </div>
  )
}
