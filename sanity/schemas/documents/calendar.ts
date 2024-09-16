import { formatDate } from 'date-fns'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'calendar',
  type: 'document',
  title: 'Sündmus',
  fields: [
    defineField({
      name: 'classes',
      title: 'Vali klass',
      type: 'reference',
      to: [{ type: 'shortCourse' }, { type: 'masterClass' }],
    }),

    defineField({
      name: 'parent',
      title: 'Sündmus toimub meistri-/eriklassi sündmuse raames',
      description: 'Vali seotud sündmus',
      type: 'reference',
      to: [{ type: 'calendar' }],
    }),
    defineField({
      name: 'active',
      title: 'Sündmusele saab registreerida',
      type: 'boolean'
    }),

    defineField({
      title: 'Kursuse algus',
      name: 'startDate',
      type: 'date'
    }),

    defineField({
      title: 'Kursuse lõpp',
      name: 'endDate',
      type: 'date'
    }),

  ], // list end
  preview: {
    select: {
      title: 'classes.name', 
      className: 'classes.name',
      classType: 'classes._type',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare: ({ className, classType, startDate}) => {
      return {
        title: className + ' - ' + formatDate(startDate, 'dd.MM.yyyy'),
        subtitle: classType === 'shortCourse' ? 'Lühiklass' : classType === 'masterClass' ? 'Meistriklass' : 'Eriklass'
      }
    },
  },
})
