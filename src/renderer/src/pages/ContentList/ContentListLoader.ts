export default async ({ params, request }) => {
  const url = new URL(request.url)
  const searchWord = url.searchParams.get('searchWord')
  const { cid } = params
  let sql = `SELECT * FROM contents`
  const sqlParams: string[] = []

  if (searchWord) {
    sql += ` WHERE title LIKE ? ORDER BY id DESC`
    sqlParams.push(`%${searchWord}%`)
    return window.api.sql(sql, 'findAll', sqlParams)
  }

  if (cid !== undefined) {
    sql += ` WHERE category_id = ?`
    sqlParams.push(cid.toString())
  }

  sql += ' ORDER BY id DESC'
  return window.api.sql(sql, 'findAll', sqlParams)
}
