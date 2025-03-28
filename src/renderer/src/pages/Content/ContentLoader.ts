export default async ({ params }) => {
  const contentSql = `SELECT * FROM contents WHERE id = ?`
  const contentParams = [params.id]
  const content = await window.api.sql(contentSql, 'findOne', contentParams)

  const categoriesSql = 'SELECT * FROM categories ORDER BY id DESC'
  const categories = await window.api.sql(categoriesSql, 'findAll')

  return {
    content,
    categories
  }
}
