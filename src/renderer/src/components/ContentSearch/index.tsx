import { Search, Add } from '@icon-park/react'
import { Form, useSubmit } from 'react-router-dom'

export const ContentSearch = () => {
  const submit = useSubmit()

  return (
    <Form>
      <div className="px-3 py-2 pt-3 bg-white shadow-sm flex items-center">
        <div className="relative flex items-center flex-grow">
          <Search className="absolute left-2 text-gray-400" size="14" />
          <input
            name="searchWord"
            type="text"
            placeholder="搜索..."
            className="w-full pl-7 pr-3 py-1 text-xs bg-gray-100 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent transition-all"
            onChange={(e) => submit(e.target.form)}
          />
        </div>
        <button
          type="button"
          className="ml-2 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors flex-shrink-0"
          onClick={() => {
            submit(null, { method: 'POST' })
          }}
        >
          <Add theme="outline" size="16" strokeWidth={3} />
        </button>
      </div>
    </Form>
  )
}
