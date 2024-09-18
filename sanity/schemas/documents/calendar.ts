import { client } from '@/sanity/lib/client'
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
      to: [{ type: 'shortCourse' }, { type: 'masterClass' }, { type: 'courseModule' }],
      options: {
        filter:  'documentNotReady != true'
      }
    }),

    defineField({
      name: 'parentMasterClass',
      title: 'Sündmus toimub meistriklassi sündmuse raames',
      description: 'Vali seotud sündmus',
      type: 'reference',
      to: [{ type: 'calendar' }],
      options: {
        filter: async () => {
          const masterClassEventIds = await client.fetch(
            '*[_type == "calendar" && classes._ref in *[_type == "masterClass" && documentNotReady != true]._id]._id'
          );
          return {
            filter: '_id in $masterClassEventIds',
            params: { masterClassEventIds },
          }
        },
      }
    }),
    defineField({
      name: 'parentCourseModule',
      title: 'Sündmus toimub eriklassi sündmuse raames',
      description: 'Vali seotud sündmus',
      type: 'reference',
      to: [{ type: 'calendar' }],
      options: {
        filter: async () => {
          const courseModuleEventIds = await client.fetch(
            '*[_type == "calendar" && classes._ref in *[_type == "courseModule" && documentNotReady != true]._id]._id'
          );
          return {
            filter: '_id in $courseModuleEventIds',
            params: { courseModuleEventIds },
          }
        },
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
