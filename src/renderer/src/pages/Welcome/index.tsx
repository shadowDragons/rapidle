import { Code } from '@icon-park/react'

export const Welcome = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-sm text-slate-600 opacity-80">
      <Code theme="outline" size="48" fill="#0a0707cd" strokeWidth={3} />
      <h1>效率工具</h1>
    </div>
  )
}
