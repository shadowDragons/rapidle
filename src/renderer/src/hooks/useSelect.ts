import { useStore } from '@renderer/store/useStore'
import { useCallback, useEffect } from 'react'
import useSearch from './useSearch'

export default () => {
  const { data, setData, setSearch, setId, id, setContent, page, totalPage, param } = useStore(
    (state) => state
  )

  const { handleSearch, search } = useSearch()
  const handleKeyEvent = useCallback(
    (e: KeyboardEvent) => {
      switch (e.code) {
        case 'ArrowUp':
          {
            const index = data.findIndex((item) => item.id == id)
            const item = data.find((item) => item.id == id)
            if (!data[index - 1]) {
              if (page != 1) {
                const nextPage = page - 1
                handleSearch(search, nextPage)
              }
            }

            setId(data[index - 1]?.id || data[data.length - 1].id)
            if (item?.isTool) {
              setSearch('@' + item.title + ' ')
            }
          }
          break
        case 'ArrowDown': {
          const index = data.findIndex((item) => item.id == id)
          const item = data.find((item) => item.id == id)
          if (!data[index + 1]) {
            if (index + 1 == 6) {
              if (page == totalPage) {
                handleSearch(search, 1)
              } else {
                const nextPage = page + 1
                handleSearch(search, nextPage)
              }
            } else if (page != 1) {
              handleSearch(search, 1)
            }
          }
          setId(data[index + 1]?.id || data[0].id)
          if (item?.isTool) {
            setSearch('@' + item.title + ' ')
          }
          break
        }
        case 'Enter': {
          selectItem(id)
          break
        }
        case 'Escape': {
          window.api.closeWindow('search')
        }
      }
    },
    [data, id, param]
  )

  async function selectItem(id: number) {
    const item = data.find((item) => item.id == id)
    const selectContent = item?.content
    if (item) {
      if (item.isApp) {
        window.api.launchApp(item.exec)
        window.api.closeWindow('search')
      } else if (item.isProcess) {
        window.api.closeProcess(item.title)
        window.api.closeWindow('search')
      } else if (item.isQuickView) {
        const url = item.content.replace('{keyword}', param)
        await window.api.openExternal(url)
      } else if (item.isTool) {
        try {
          const encodedParam = encodeURIComponent(param)
          const url = item.content.replace('{keyword}', encodedParam)

          let response
          try {
            response = await fetch(url)
          } catch (fetchError) {
            if (fetchError instanceof Error) {
              throw new Error('获取数据失败：' + fetchError.message)
            } else {
              throw new Error('获取数据失败：发生未知错误')
            }
          }

          if (!response.ok) {
            throw new Error(`HTTP错误！状态码：${response.status}`)
          }

          let jsonData
          try {
            jsonData = await response.json()
          } catch (jsonError) {
            console.error('解析JSON时出错：', jsonError)
            if (jsonError instanceof Error) {
              throw new Error('解析JSON失败：' + jsonError.message)
            } else {
              throw new Error('解析JSON失败：发生未知错误')
            }
          }

          const formattedJsonString = JSON.stringify(jsonData, null, 2)

          setContent(formattedJsonString)
        } catch (error) {
          console.error('获取或处理数据时出错：', error)
          if (error instanceof Error) {
            setContent('访问API或处理数据时出错：' + error.message)
          } else {
            setContent('访问API或处理数据时出错：发生未知错误')
          }
        }
      } else if (item.type == 2) {
        if (selectContent) {
          setContent(selectContent)
        }
      } else {
        if (selectContent) {
          await navigator.clipboard.writeText(selectContent)
        }
        window.api.closeWindow('search')
      }
    }

    setData([])
    setSearch('')
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvent)
    return () => {
      document.removeEventListener('keydown', handleKeyEvent)
    }
  }, [handleKeyEvent])

  useEffect(() => {
    setId(data[0]?.id || 0)
  }, [data])
  return { data, id, selectItem }
}
