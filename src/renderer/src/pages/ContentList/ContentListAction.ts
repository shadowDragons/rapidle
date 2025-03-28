import { redirect } from 'react-router-dom'

export default async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  // 获取当前时间的函数
  const getCurrentTimestamp = () => {
    return new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
  try {
    switch (request.method) {
      case 'POST': {
        const sql = `INSERT INTO contents (title, content, category_id, created_at) VALUES (?, ?, ?, ?)`
        const params = ['未命名片段', '', data.category_id, getCurrentTimestamp()]
        const result = await window.api.sql(sql, 'insert', params)
        const id = result
        return redirect(`content/${id}`)
      }
      case 'DELETE': {
        const sql = `DELETE FROM contents WHERE id = ?`
        const params = [data.id]
        await window.api.sql(sql, 'del', params)
        return {}
      }
    }
  } catch (error) {
    console.error('Error performing content action:', error)
    return { error: '处理请求时发生错误。' }
  }

  return {}
}
