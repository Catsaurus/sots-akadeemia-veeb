import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'moodul',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Mooduli nimetus',
      type: 'string',
    }),
    defineField({
      name: 'mooduliVarv',
      title: 'Mooduli värv',
      description: 'Seda kuvataske ainult siin keskkonnas',
      type: 'string',
    }),
  ], // list end
  preview: {
    select: {
      title: 'name', 
      mooduliVarv: 'mooduliVarv',
      media: '#ccc'
    },
    prepare: ({title, mooduliVarv}) => {
      const subtitle = 'Viimati muudetud: '
      return {
        title,
        subtitle,

      }
    },
  },
})
