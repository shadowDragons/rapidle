export default async () => {
  const sql = `SELECT * FROM quick_view`
  const sqlParams: string[] = []
  return window.api.sql(sql, 'findAll', sqlParams)
}
