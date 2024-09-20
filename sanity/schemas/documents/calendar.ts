import { formatDate } from 'date-fns'
import {defineField, defineType} from 'sanity'

import { client } from '@/sanity/lib/client'

export default defineType({
  name: 'calendar',
  type: 'document',
  title: 'Sündmus',
  fields: [
    defineField({
      name: 'classes',
      title: 'Vali klass',
      type: 'reference',
      to: [{ type: 'shortCourse' }, { type: 'masterClass' }, { type: 'courseModule' }],
      options: {
        filter:  'documentNotReady != true'
      }
    }),

    defineField({
      name: 'parentMasterClasses',
      title: 'Sündmus toimub meistriklassi sündmuse raames',
      type: 'array',
      of: [
        {
          title: 'Vali meistriklass',
          type: 'reference',
          to: [{ type: 'calendar' }],
          options: {
            filter: async () => {
              const parentEventIds = await client.fetch(
                '*[_type == "calendar" && classes._ref in *[_type == "masterClass" && documentNotReady != true]._id]._id'
              );
              return {
                filter: '_id in $parentEventIds',
                params: { parentEventIds },
              }
            },
          },
        }
      ],
      validation: Rule => Rule.unique()
    }),

    defineField({
      name: 'parentCourseModules',
      title: 'Sündmus toimub eriklassi sündmuse raames',
      type: 'array',
      of: [
        {
          title: 'Vali eriklass',
          type: 'reference',
          to: [{ type: 'calendar' }],
          options: {
            filter: async () => {
              const parentEventIds = await client.fetch(
                '*[_type == "calendar" && classes._ref in *[_type == "courseModule" && documentNotReady != true]._id]._id'
              );
              return {
                filter: '_id in $parentEventIds',
                params: { parentEventIds },
              }
            },
          },
        }
      ],
      validation: Rule => Rule.unique()
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

    defineField({
      title: 'Kokkuvõtva ürituse kuupäev',
      description: 'Kasutatakse meistriklassi viimase ürituse kuvamiseks',
      name: 'summaryEventDate',
      type: 'date'
    }),

  ],
  orderings: [
    {
      title: 'Alguskuupäev',
      name: 'startDateAsc',
      by: [
        { field: 'startDate', direction: 'asc' },
        { field: 'endDate', direction: 'asc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'classes.name', 
      className: 'classes.name',
      classType: 'classes._type',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare: ({ className, classType, startDate, endDate }) => {
      return {
        title: className,
        subtitle: formatDate(startDate, 'dd.MM.yyyy') + '-' + formatDate(endDate, 'dd.MM.yyyy') + ' / ' +
          (classType === 'shortCourse' ? 'Lühiklass' : classType === 'masterClass' ? 'Meistriklass' : 'Eriklass' )
      }
    },
  },
})
