import dayjs from 'dayjs'

export function formatMoney(amount: number, currency = 'VND') {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  })
    .format(amount)
    .replace(/\s/, '')
}

type DateFormat = 'HH:mm' | 'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm' | 'DD/MM/YYYY HH:mm:ss'
export function formatTime(time: string | number | Date | dayjs.Dayjs, format?: DateFormat) {
  return dayjs(time).format(format || 'HH:mm')
}
