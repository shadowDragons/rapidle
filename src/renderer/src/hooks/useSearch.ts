import { useStore } from '@renderer/store/useStore'

export default () => {
  const { setData, setContent, setPage, setTotalPage, setParam } = useStore((s) => s)
  const { search, setSearch } = useStore()

  const handleAppSearch = async (keyword: string) => {
    const data = await window.api.getInstalledApps(keyword.replace(/^a:/, ''))
    setData(data as HomeSearchItem[])
    setTotalPage(1)
  }

  const handleProcessSearch = async (keyword: string) => {
    const data = await window.api.getProcessList(keyword.replace(/^k:/, ''))
    setData(data as HomeSearchItem[])
    setTotalPage(1)
  }

  const handleQuickViewSearch = async (keyword: string, page: number) => {
    const limit = (page - 1) * 6
    const offset = 6
    const keywords = keyword.replace(/^q:/, '').split(' ')
    const sql = `SELECT id,name as title,url as content FROM quick_view WHERE abbr like ? or name like ? limit  ?,?`
    const params = [`%${keywords[0]}%`, `%${keywords[0]}%`, limit, offset]
    const data: HomeSearchItem[] = await window.api.sql(sql, 'findAll', params)

    const dataWithQuickView = data.map((item) => ({ ...item, isQuickView: true }))
    setData(dataWithQuickView)
    setParam(keywords.slice(1).join(' '))
    setContent('')
    setPage(page)

    const sql_count = `SELECT count(*) as cnt FROM quick_view a WHERE (abbr LIKE ? or name LIKE ?)`
    const data_count: HomeSearchItem = await window.api.sql(sql_count, 'findOne', params)
    setTotalPage(Math.ceil(data_count.cnt / 6))
  }

  const handleToolSearch = async (keyword: string, page: number) => {
    const limit = (page - 1) * 6
    const offset = 6
    const keywords = keyword.replace(/^t:/, '').split(' ')
    const sql = `SELECT id,name as title,url as content FROM tools WHERE abbr like ? or name like ? limit  ?,?`
    const params = [`%${keywords[0]}%`, `%${keywords[0]}%`, limit, offset]
    const data: HomeSearchItem[] = await window.api.sql(sql, 'findAll', params)

    const dataWithTool = data.map((item) => ({ ...item, isTool: true }))
    setData(dataWithTool)
    setParam(keywords.slice(1).join(' '))
    setContent('')
    setPage(page)

    const sql_count = `SELECT count(*) as cnt FROM tools a WHERE (abbr LIKE ? or name LIKE ?)`
    const data_count: HomeSearchItem = await window.api.sql(sql_count, 'findOne', params)
    setTotalPage(Math.ceil(data_count.cnt / 6))
  }

  const handleContentSearch = async (keyword: string, page: number) => {
    const limit = (page - 1) * 6
    const offset = 6

    const toolsSql = `SELECT id, name as title, url as content, '' as type
      FROM tools WHERE abbr LIKE ? or name LIKE ?`
    const quickViewSql = `SELECT id, name as title, url as content, '' as type
      FROM quick_view WHERE abbr LIKE ? or name LIKE ?`
    const snippetSql = `SELECT a.id, a.title, a.content, a.type as type, b.name as categorie_name
      FROM contents a
      LEFT JOIN categories b on a.category_id = b.id
      WHERE a.title LIKE ? or b.name LIKE ?`

    const params = [`%${keyword}%`, `%${keyword}%`]

    const toolsData: HomeSearchItem[] = await window.api
      .sql(toolsSql, 'findAll', params)
      .then((data: any) => data.map((item) => ({ ...item, id: `tool_${item.id}` })))

    const quickViewData: HomeSearchItem[] = await window.api
      .sql(quickViewSql, 'findAll', params)
      .then((data: any) => data.map((item) => ({ ...item, id: `quick_${item.id}` })))

    const snippetData: HomeSearchItem[] = await window.api
      .sql(snippetSql, 'findAll', params)
      .then((data: any) => data.map((item) => ({ ...item, id: `snippet_${item.id}` })))

    const appsData: HomeSearchItem[] = await window.api
      .getInstalledApps(keyword)
      .then((data: any) => data.map((item) => ({ ...item, id: `app_${item.id}` })))

    const allData = [
      ...toolsData.map((item) => ({ ...item, isTool: true })),
      ...quickViewData.map((item) => ({ ...item, isQuickView: true })),
      ...appsData.map((item) => ({ ...item, isApp: true })),
      ...snippetData.map((item) => ({ ...item, isSnippet: true }))
    ]

    const totalItems = allData.length
    const pagedData = allData.slice(limit, limit + offset)

    setData(pagedData)
    setContent('')
    setPage(page)
    setTotalPage(Math.ceil(totalItems / 6))
  }

  const handleSearch = async (keyword: string, page: number) => {
    setSearch(keyword)
    const keywords = keyword.split(' ')
    const tmpParam = keywords.slice(1).join(' ')
    setParam(tmpParam)

    if (keyword.includes(' ')) {
      return
    }

    if (search != keyword) {
      page = 1
    }

    if (keyword.startsWith('a:')) {
      await handleAppSearch(keyword)
    } else if (keyword.startsWith('k:')) {
      await handleProcessSearch(keyword)
    } else if (keyword.startsWith('q:')) {
      await handleQuickViewSearch(keyword, page)
    } else if (keyword.startsWith('t:')) {
      await handleToolSearch(keyword, page)
    } else if (keyword.length > 0) {
      await handleContentSearch(keyword, page)
    } else {
      setData([])
      setTotalPage(1)
      setContent('')
      setPage(1)
      return
    }
  }

  return { search, handleSearch }
}
