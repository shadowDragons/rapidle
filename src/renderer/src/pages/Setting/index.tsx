import { useState } from 'react'
import { useStore } from '@renderer/store/useStore'
import { Form, useSubmit } from 'react-router-dom'
import { Input, Card } from 'antd'
import './styles.scss'

export const Setting = () => {
  const [keys, setKeys] = useState<string[]>([])
  const config = useStore((s) => s.config)
  const setConfig = useStore((s) => s.setConfig)
  const submit = useSubmit()

  const handleKeyDown = (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) {
      const code = e.code.replace(/Left|Right|Key|Digit/, '')
      if (keys.includes(code)) return
      const newKeys = [...keys, code]
      setKeys(newKeys)
      if (code.match(/^(\w|Space)$/gi)) {
        const newShortcut = newKeys.join('+')
        setKeys([])
        const updatedConfig = { ...config, shortCut: newShortcut }
        setConfig(updatedConfig)
        window.api.shortCut(newShortcut)
        submit(updatedConfig, { method: 'post' })
      }
    }
  }

  return (
    <Form method="POST">
      <main className="setting-page">
        <h1>软件配置</h1>
        <Card title="快捷键设置" className="setting-card">
          <Input
            type="text"
            name="shortCut"
            readOnly
            value={config.shortCut || ''}
            placeholder="点击输入快捷键"
            onKeyDown={handleKeyDown}
          />
        </Card>
      </main>
    </Form>
  )
}
