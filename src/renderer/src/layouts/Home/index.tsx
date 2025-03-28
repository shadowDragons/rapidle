import isPropValid from '@emotion/is-prop-valid'
import Error from '@renderer/components/Error'
import Result from '@renderer/components/Result'
import Search from '@renderer/components/Search'
import ShowContent from '@renderer/components/ShowContent'
import useIgnoreMouseEvents from '@renderer/hooks/useIgnoreMouseEvents'
import { useShortcut } from '@renderer/hooks/useShortCut'
import { useWindowHidden } from '@renderer/hooks/useWindowHidden'
import { useEffect, useRef } from 'react'
import { StyleSheetManager } from 'styled-components'

function Home(): JSX.Element {
  const mainRef = useRef<HTMLDivElement | null>(null)
  const { setIgnoreMouseEvents, platform } = useIgnoreMouseEvents()
  useWindowHidden()
  useShortcut()
  useEffect(() => {
    let cleanup: (() => void) | undefined

    if (platform !== null) {
      cleanup = setIgnoreMouseEvents(mainRef)
    }

    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [setIgnoreMouseEvents, platform])
  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <main className="relative p-3" ref={mainRef}>
        <Error />
        <div className="relative">
          <Search />
          <div className="absolute top-[calc(100%-6px)] left-0 right-0 bg-slate-50 rounded-b-lg overflow-y-auto max-h-[calc(100vh-120px)]">
            <Result />
            <ShowContent />
          </div>
        </div>
      </main>
    </StyleSheetManager>
  )
}
export default Home
