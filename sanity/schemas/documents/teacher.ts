import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teacher',
  title: 'Akadeemik',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nimi',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Pilt',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Kirjeldus',
      type: 'text',
    }),
  ],
})