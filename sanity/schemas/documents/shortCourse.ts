import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'shortCourse',
  title: 'Lühiklass',
  type: 'document',
  fieldsets: [
    { name: 'participants', title: 'Osalejad', options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Lühiklassi nimetus',
      type: 'string'
    }),
    defineField({
      name: 'shortDescription',
      title: 'Lühiklassi lühikirjeldus',
      type: 'string'
    }),
    defineField({
      name: 'body',
      title: 'Lühiklassi kirjeldus',
      type: 'blockContent'
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
      name: 'registrationLink',
      title: 'Registreerimise link (Google Forms)',
      type: 'url'
    }),
    defineField({
      name: 'minParticipants',
      title: 'Minimaalne osalejate arv',
      type: 'string',
      fieldset: 'participants',
    }),
    defineField({
      name: 'maxParticipants',
      title: 'Maksimaalne osalejate arv',
      type: 'number',
      initialValue: 18,
      fieldset: 'participants',
    }),
    defineField({
      name: 'courseSize',
      title: 'Lühiklassi ainemaht',
      type: 'number',
      initialValue: 20,
      description: 'Maht tundides'
    }),
    defineField({
      name: 'price',
      title: 'Hind (€)',
      type: 'number'
    }),
    defineField({
      name: 'city',
      title: 'Toimumiskoht (linn)',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Toimumiskoha aadress',
      type: 'string',
    }),
    defineField({
      name: 'courseModule',
      title: 'Eriklass, kuhu kuulub',
      type: 'reference',
      to: [{ type: 'courseModule' }]
    }),
  ], // list end
  preview: {
    select: {
      title: 'name',
      subtitle: 'courseModule.name',
    },
  },
})
