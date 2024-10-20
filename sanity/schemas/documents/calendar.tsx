import {defineField, defineType} from 'sanity'

import { DATE_FORMAT, formatRange } from '@/app/helpers/date.helper';
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
      type: 'date',
      validation: (Rule) => Rule.required().error('Alguskuupäev on kohustuslik')
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
      title: 'Alguskuupäev kasvav',
      name: 'startDateAsc',
      by: [
        { field: 'startDate', direction: 'asc' },
        { field: 'endDate', direction: 'asc' }
      ]
    },
    {
      title: 'Alguskuupäev kahanev',
      name: 'startDateDesc',
      by: [
        { field: 'startDate', direction: 'desc' },
        { field: 'endDate', direction: 'desc' }
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

      const eventDate = formatRange(startDate, endDate, DATE_FORMAT);

      return {
        title: className,
        subtitle: eventDate + ' / ' +
          (classType === 'shortCourse' ? 'Lühiklass' : classType === 'masterClass' ? 'Meistriklass' : 'Eriklass' ),
        media: <strong>{ classType === 'shortCourse' ? 'LK' : classType === 'masterClass' ? 'MK' : 'EK'  }</strong>
      }
    },
  },
})
