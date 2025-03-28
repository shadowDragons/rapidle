import dayjs from 'dayjs'

export const formatDate = (date: string | number | Date) => {
  return dayjs(date).format('YY/MM/DD')
}
