import { CategoryItem } from '@renderer/components/CategoryItem'
import { QuickNav } from '@renderer/components/QuickNav'
import { useLoaderData, Outlet, useFetcher } from 'react-router-dom'
import { IconFolderPlus } from '@tabler/icons-react'
import './category.scss'
import styles from './styles.module.scss'

export const Category = () => {
  const categories = useLoaderData() as CategoryType[]
  const fetcher = useFetcher()

  const handleAddCategory = () => {
    fetcher.submit({ name: '新分类' }, { method: 'POST' })
  }

  return (
    <div className={styles.category}>
      <div className={styles['category-list']}>
        <div className={styles['category-header']}>
          <h2>分类管理</h2>
          <button className={styles['add-category-btn']} onClick={handleAddCategory}>
            <IconFolderPlus size={16} />
            <span>新建分类</span>
          </button>
        </div>

        <div className={styles['category-list']}>
          <QuickNav />
          {categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>

      <div className={styles['category-content']}>
        <Outlet />
      </div>
    </div>
  )
}
