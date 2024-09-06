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
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'See on osa antud lehekülje aadressist. Kui seda muuta, siis varem jagatud lingid võivad olla katki.',
      validation: (Rule) => Rule.required().error('Väli on kohustuslik!'),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'color',
      title: 'Mooduli värv',
      description: 'Seda kuvatakse ainult siin keskkonnas',
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
