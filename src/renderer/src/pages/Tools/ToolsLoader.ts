export default async () => {
  const sql = `SELECT * FROM tools`
  const sqlParams: string[] = []
  return window.api.sql(sql, 'findAll', sqlParams)
}
