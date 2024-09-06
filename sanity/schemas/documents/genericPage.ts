import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'genericPage',
  title: 'Üldine leht',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Lehe pealkiri',
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
      name: 'blocks',
      title: 'Sisuplokid',
      type: 'array',
      of: [
        { type: 'textBlock' },
        { type: 'shortCourseTable' }
      ]
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
