import { Form, useLoaderData, useSubmit, useNavigate } from 'react-router-dom'
import './content.scss'

export const Content = () => {
  const submit = useSubmit()
  const { content, categories } = useLoaderData() as {
    content: ContentType
    categories: CategoryType[]
  }
  const navigate = useNavigate()

  return (
    <div>
      <button onClick={() => navigate('..')} className="back-button">
        返回列表
      </button>
      <Form method="PUT" className="content-page">
        <input type="text" name="id" defaultValue={content.id} hidden />
        <input
          name="title"
          placeholder="请输入标题..."
          autoFocus
          defaultValue={content.title}
          onChange={(e) => submit(e.target.form)}
        />

        <div className="options">
          <div className="select">
            <label>分类：</label>
            <select
              name="category_id"
              value={content.category_id}
              onChange={(e) => submit(e.target.form)}
            >
              <option value="0">未分类</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="select">
            <label>类型：</label>
            <select name="type" value={content.type} onChange={(e) => submit(e.target.form)}>
              <option value="1">直接复制</option>
              <option value="2">查看</option>
            </select>
          </div>
        </div>

        <textarea
          name="content"
          placeholder="请输入内容..."
          defaultValue={content.content}
          onChange={(e) => submit(e.target.form)}
        />
      </Form>
    </div>
  )
}
