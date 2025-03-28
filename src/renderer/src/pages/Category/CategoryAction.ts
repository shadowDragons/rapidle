import { redirect } from 'react-router-dom'

export default async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const getCurrentTimestamp = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
  try {
    switch (request.method) {
      case 'POST': {
        const sql = `INSERT INTO categories (name, created_at) VALUES (?, ?)`
        const params = ['未命名', getCurrentTimestamp()]
        await window.api.sql(sql, 'insert', params)
        break
      }
      case 'DELETE': {
        const deleteSql = `DELETE FROM categories WHERE id = ?`
        const updateSql = `UPDATE contents SET category_id = 0 WHERE category_id = ?`
        const params = [data.id]
        await window.api.sql(deleteSql, 'del', params)
        await window.api.sql(updateSql, 'update', params)
        return redirect('/config/category')
      }
      case 'PUT': {
        const sql = `UPDATE categories SET name = ? WHERE id = ?`
        const params = [data.name, data.id]
        await window.api.sql(sql, 'update', params)
        break
      }
    }

    return redirect('/config/category/contentList')
  } catch (error) {
    console.error('Error performing category action:', error)
    return { error: '处理请求时发生错误。' }
  }

  return {}
}
