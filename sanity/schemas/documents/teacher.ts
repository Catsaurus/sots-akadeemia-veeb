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
      validation: (Rule) => Rule.required().error('Väli on kohustuslik!'),
    }),
    defineField({
      name: 'image',
      title: 'Pilt',
      type: 'image',
      validation: (Rule) => Rule.required().error('Väli on kohustuslik!'),
    }),
    defineField({
      name: 'description',
      title: 'Kirjeldus',
      type: 'blockContent',
      validation: (Rule) => Rule.required().error('Väli on kohustuslik!'),
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      description: 'Selle välja tühjaks jätmisel, ei kuvata isiku juures tema telefoni numbrit'

    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
      description: 'Selle välja tühjaks jätmisel, ei kuvata isiku juures tema emaili'
    }),
  ],
})