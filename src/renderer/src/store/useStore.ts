import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
interface StateProps {
  config: ConfigDataType
  setConfig: (config: ConfigDataType) => void
  data: HomeSearchItem[]
  setData: (data: HomeSearchItem[]) => void
  search: string
  setSearch: (search: string) => void
  error: string
  setError: (message: string) => void
  id: number
  setId: (id: number) => void
  editCategoryId: number
  setEditCategoryId: (id: number) => void
  content: string
  setContent: (content: string) => void
  page: number
  setPage: (page: number) => void
  totalPage: number
  setTotalPage: (totalPage: number) => void
  platform: string
  setPlatform: (platform: string) => void
  param: string
  setParam: (param: string) => void
}

export const useStore = create(
  persist<StateProps>(
    (set) => ({
      config: {
        shortCut: '',
        dbType: 'sqlite',
        mysqlHost: '',
        mysqlPort: '',
        mysqlDatabase: '',
        mysqlUsername: '',
        mysqlPassword: '',
        databaseDirectory: ''
      },
      setConfig: (config) => set({ config }),
      data: [],
      setData: (data) => set({ data }),
      search: '',
      setSearch: (content) => set({ search: content }),
      content: '',
      setContent: (content) => set({ content: content }),
      error: '',
      setError: (message) => set({ error: message }),
      id: 0,
      setId: (id) => set({ id }),
      editCategoryId: 0,
      setEditCategoryId: (editCategoryId) => set({ editCategoryId }),
      page: 1,
      setPage: (page) => set({ page }),
      totalPage: 1,
      setTotalPage: (totalPage) => set({ totalPage }),
      platform: '',
      setPlatform: (platform) => set({ platform }),
      param: '',
      setParam: (param) => set({ param: param })
    }),
    {
      name: 'rapidle-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
