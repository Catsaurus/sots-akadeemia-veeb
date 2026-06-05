import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'dateRange',
  title: 'Kuupäevavahemik',
  type: 'object',
  fields: [
    defineField({
      name: 'startDate',
      title: 'Alguskuupäev',
      type: 'date',
    }),
    defineField({
      name: 'endDate',
      title: 'Lõppkuupäev',
      type: 'date',
    }),
  ],
  validation: (Rule) =>
    Rule.custom((value) => {
      if (!value) return true
      const { startDate, endDate } = value as { startDate?: string; endDate?: string }
      if (startDate && !endDate) {
        return 'Lõppkuupäev on kohustuslik, kui alguskuupäev on täidetud'
      }
      if (!startDate && endDate) {
        return 'Alguskuupäev on kohustuslik, kui lõppkuupäev on täidetud'
      }
      if (startDate && endDate && startDate > endDate) {
        return 'Alguskuupäev peab olema varasem kui lõppkuupäev'
      }
      return true
    }),
  preview: {
    select: {
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ startDate, endDate }) {
      const formatDate = (d: string) => {
        if (!d) return '?'
        const [y, m, day] = d.split('-')
        return `${day}.${m}.${y}`
      }
      const title =
        startDate && endDate
          ? startDate === endDate
            ? formatDate(startDate)
            : `${formatDate(startDate)} – ${formatDate(endDate)}`
          : 'Täitmata vahemik'
      return { title }
    },
  },
})
