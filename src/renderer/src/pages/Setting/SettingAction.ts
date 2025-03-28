export default async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const isRegister = await window.api.shortCut(data.shortCut)

    if (isRegister) {
      const sql = `UPDATE config SET content = ? WHERE id = 1`
      const params = [JSON.stringify(data)]
      await window.api.sql(sql, 'updateConfig', params)
      await window.api.initTable()
    }

    return {}
  } catch (error) {
    console.error('Error updating settings:', error)
    return { error: '更新设置时发生错误。' }
  }
}
