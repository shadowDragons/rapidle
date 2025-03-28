import { redirect } from 'react-router-dom'

export default async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const sql = `UPDATE contents SET title = ?, content = ?, category_id = ?, type = ? WHERE id = ?`
    const params2 = [data.title, data.content, data.category_id, data.type, data.id]
    await window.api.sql(sql, 'update', params2)

    return redirect(`/config/category/contentList/${data.category_id}/content/${data.id}`)
  } catch (error) {
    console.error('Error updating content:', error)
    return { error: '更新内容时发生错误。' }
  }
}
