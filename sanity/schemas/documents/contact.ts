import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Lehe pealkiri',
      type: 'string'
    }),
    defineField({
      name: 'teachers',
      title: 'Akadeemikud',
      type: 'array',
      of: [
        {
          title: 'Vali akadeemik',
          type: 'reference',
          to: [{ type: 'teacher' }],
        },
      ],
      validation: Rule => Rule.unique()
    }),
  ],
})