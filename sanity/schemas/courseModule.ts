import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'courseModule',
  title: 'Eriklass',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Mooduli nimetus',
      type: 'string',
    }),
    defineField({
      name: 'color',
      title: 'Mooduli värv',
      description: 'Seda kuvataske ainult siin keskkonnas',
      type: 'string',
    }),
  ], // list end
  preview: {
    select: {
      title: 'name', 
      color: 'color',
      media: '#ccc'
    },
    prepare: ({title, color}) => {
      const subtitle = 'Viimati muudetud: '
      return {
        title,
        subtitle,

      }
    },
  },
})
