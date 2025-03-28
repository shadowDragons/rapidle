import './styles.scss'
import { useStore } from '@renderer/store/useStore'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ShowContent() {
  const content = useStore((state) => state.content)

  return (
    <main className="content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p style={{ whiteSpace: 'pre-wrap' }}>{children}</p>
        }}
      >
        {content}
      </ReactMarkdown>
    </main>
  )
}
