import { useEffect } from 'react'
import { useStore } from '@renderer/store/useStore'

export function useWindowHidden() {
  const { setData, setTotalPage, setContent, setPage, setSearch } = useStore()

  useEffect(() => {
    const handleWindowHidden = () => {
      setData([])
      setTotalPage(1)
      setContent('')
      setPage(1)
      setSearch('')
    }

    window.electron.ipcRenderer.on('window-hidden', handleWindowHidden)

    return () => {
      window.electron.ipcRenderer.removeListener('window-hidden', handleWindowHidden)
    }
  }, [setData, setTotalPage, setContent, setPage])
}
