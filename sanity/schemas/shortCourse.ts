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
