import { Delete } from '@icon-park/react'
import { useContextMenu } from 'mantine-contextmenu'
import { NavLink, useSubmit } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'

interface Props {
  category: CategoryType
}

export const CategoryItem = ({ category }: Props) => {
  const submit = useSubmit()
  const { showContextMenu } = useContextMenu()
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(category.name)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsEditing(true)
  }

  const handleSubmit = () => {
    if (editName.trim() && editName !== category.name) {
      submit({ id: category.id, name: editName.trim() }, { method: 'PUT' })
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    } else if (e.key === 'Escape') {
      setEditName(category.name)
      setIsEditing(false)
    }
  }

  return (
    <NavLink
      to={`contentList/${category.id}`}
      className={({ isActive }) => {
        return [isActive ? styles.active : '', styles.link].join(' ')
      }}
      onContextMenu={showContextMenu(
        [
          {
            key: 'remove',
            icon: <Delete theme="outline" size="18" strokeWidth={3} />,
            title: '删除分类',
            onClick: () => {
              if (confirm('确定要删除这个分类吗？该分类下的所有片段也将被删除。')) {
                submit({ id: category.id }, { method: 'DELETE' })
              }
            }
          }
        ],
        { className: 'contextMenu' }
      )}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          ref={inputRef}
          className={styles.editInput}
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="truncate">{category.name}</div>
      )}
    </NavLink>
  )
}
