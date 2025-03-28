import useSelect from '@renderer/hooks/useSelect'
import classNames from 'classnames'
import './styles.scss'

export default function Result() {
  const { data, id, selectItem } = useSelect()

  const getItemTitle = (item: any) => {
    const types = {
      isTool: '工具',
      isApp: '应用',
      isQuickView: '快速访问',
      isProcess: '进程',
      isSnippet: '片段'
    }

    let title = item.title
    if (item.isSnippet) {
      title = `${item.categorie_name} - ${item.title}`
    }

    for (const [key, prefix] of Object.entries(types)) {
      if (item[key]) {
        return `${prefix} - ${title}`
      }
    }
    return title
  }

  return (
    <main className={classNames('result', { 'pt-3': data.length > 0 })}>
      {data.map((item) => (
        <div
          key={item.id}
          className={classNames({ active: item.id == id })}
          onClick={() => selectItem(item.id)}
        >
          {getItemTitle(item)}
        </div>
      ))}
    </main>
  )
}
