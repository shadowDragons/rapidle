import { useNavigate } from 'react-router-dom'

export default () => {
  const navigate = useNavigate()
  const updateContentCategory = async (id: number, cateogry_id: number) => {
    await window.api.sql(`update contents set category_id=@cateogry_id where id=@id`, 'update', {
      id,
      cateogry_id
    })
    navigate(`/config/category/contentList/${cateogry_id}/content/${id}`)
  }

  return { updateContentCategory }
}
