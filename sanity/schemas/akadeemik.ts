import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'akadeemik',
  type: 'document',
  fields: [
    defineField({
      name: 'nimi',
      title: 'Nimi',
      type: 'string',
    }),
    defineField({
      name: 'pilt',
      title: 'Pilt',
      type: 'image',
    }),
    defineField({
      name: 'kirjeldus',
      title: 'Kirjeldus',
      type: 'string',
    }),
  ],
})