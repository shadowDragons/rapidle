import { useEffect } from 'react'
import { useStore } from '@renderer/store/useStore'

export function useShortcut() {
  const config = useStore((s) => s.config)

  useEffect(() => {
    if (config.shortCut) {
      window.api.shortCut(config.shortCut)
    }
  }, [config.shortCut])
}
