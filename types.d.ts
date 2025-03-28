type SqlActionType = 'findAll' | 'findOne' | 'insert' | 'update' | 'del' | 'config' | 'updateConfig'

type CategoryType = {
  id: number
  name: string
  created_at: string
}

type ContentType = {
  id: number
  title: string
  category_id: number
  content: string
  created_at: string
  type: number
}

type AppInfo = {
  id: number
  title: string
  exec: string
}

type HomeSearchItem = {
  id: number
  title: string
  content: string
  categorie_name: string
  exec: string
  type: number
  cnt: number
  isApp: boolean
  isTool: boolean
  isQuickView: boolean
  isProcess: boolean
  isSnippet: boolean
}

type ConfigType = {
  id: number
  content: string
}

type ConfigDataType = {
  shortCut: string
  databaseDirectory: string
}

interface ToolType {
  id: number
  name: string
  abbr: string
  url: string
}
type QuickViewType = {
  id: number
  name: string
  abbr: string
  url: string
  create_at: string
}

type WindowNameType = 'search' | 'config' | 'code' | 'content'
