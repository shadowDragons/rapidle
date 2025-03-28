import { Add } from '@icon-park/react'
import { useSubmit } from 'react-router-dom'

export const FooterMenu = () => {
  const submit = useSubmit()
  return (
    <div className="nav">
      <Add
        theme="outline"
        size="20"
        strokeWidth={2}
        onClick={() => {
          submit(null, { method: 'POST' })
        }}
      />
    </div>
  )
}
