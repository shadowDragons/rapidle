import { MutableRefObject, useCallback, useEffect, useState } from 'react'

type Platform = 'aix' | 'darwin' | 'freebsd' | 'linux' | 'openbsd' | 'sunos' | 'win32' | string

export default () => {
  const [platform, setPlatform] = useState<Platform | null>(null)

  useEffect(() => {
    window.api.getPlatform().then((result: string) => {
      setPlatform(result as Platform)
    })
  }, [])

  const setIgnoreMouseEvents = useCallback(
    (el: MutableRefObject<HTMLElement | null>) => {
      if (!el.current || !platform) return

      const handleMouseOver = () => {
        window.api.setIgnoreMouseEvents(false)
      }

      const handleBodyMouseOver = (e: MouseEvent) => {
        if (e.target === document.body) {
          window.api.setIgnoreMouseEvents(true, { forward: true })
        }
      }

      if (platform === 'win32' || platform === 'darwin') {
        el.current.addEventListener('mouseover', handleMouseOver)
        document.body?.addEventListener('mouseover', handleBodyMouseOver)
      } else {
        window.api.setIgnoreMouseEvents(false)
      }

      return () => {
        if (platform === 'win32' || platform === 'darwin') {
          el.current?.removeEventListener('mouseover', handleMouseOver)
          document.body?.removeEventListener('mouseover', handleBodyMouseOver)
        } else {
          window.api.setIgnoreMouseEvents(false)
        }
      }
    },
    [platform]
  )

  return { setIgnoreMouseEvents, platform }
}
