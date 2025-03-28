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
        const sql = `INSERT INTO quick_view (name, abbr, url, created_at) VALUES (?, ?, ?, ?)`
        const params = ['未命名', '', '', getCurrentTimestamp()]
        await window.api.sql(sql, 'insert', params)

        break
      }
      case 'DELETE': {
        const sql = `DELETE FROM quick_view WHERE id = ?`
        const params = [data.id]
        await window.api.sql(sql, 'del', params)
        break
      }
      case 'PUT': {
        const sql = `UPDATE quick_view SET name = ?, abbr = ?, url = ? WHERE id = ?`
        const params = [data.name, data.abbr, data.url, data.id]
        await window.api.sql(sql, 'update', params)
        break
      }
    }

    return redirect('/config/quickView')
  } catch (error) {
    console.error('Error performing quick view action:', error)
    return { error: '处理请求时发生错误。' }
  }
}
