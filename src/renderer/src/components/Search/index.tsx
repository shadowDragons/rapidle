import { Setting } from '@icon-park/react'
import useSearch from '@renderer/hooks/useSearch'
import { Input } from 'antd'
import { useEffect, useRef } from 'react'
import type { InputRef } from 'antd'

export default function Search() {
  const { handleSearch, search } = useSearch()
  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }

    window.electron.ipcRenderer.on('focus-input', focusInput)

    return () => {
      window.electron.ipcRenderer.removeAllListeners('focus-input')
    }
  }, [])
  return (
    <div className="bg-slate-50 p-3 rounded-lg drag">
      <section className="bg-slate-200 p-2 rounded-lg flex items-center gap-1 nodrag">
        <Input
          id="focusedInput"
          ref={inputRef}
          value={search}
          onChange={(e) => handleSearch(e.target.value, 1)}
          autoFocus
          className="flex-grow"
        />
        <Setting
          theme="outline"
          size="20"
          fill="#333"
          className="cursor-pointer flex-shrink-0"
          onClick={() => window.api.openWindow('code')}
        />
      </section>
    </div>
  )
}
