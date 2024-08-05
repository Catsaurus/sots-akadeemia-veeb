import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'luhiklass',
  type: 'document',
  title: 'Lühiklass',
  fields: [
    defineField({
      name: 'name',
      title: 'Lühiklassi nimetus',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
        name: 'body',
        title: 'Kursuse kirjeldus',
        type: 'blockContent',
      }),
  ], // list end
})
