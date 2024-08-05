import { collate, defineField, defineType } from 'sanity'

export default defineType({
  name: 'aine',
  type: 'document',
  fieldsets: [
    { name: 'osalejad', title: 'Osalejad', options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Aine nimetus',
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
      name: 'minOsalejateArv',
      title: 'Minimaalne osalejate arv',
      type: 'string',
      fieldset: 'osalejad',
    }),
    defineField({
      name: 'maxOsalejaArv',
      title: 'Maksimaalne osalejate arv',
      type: 'number',
      initialValue: 18,
      fieldset: 'osalejad',
    }),
    defineField({
      name: 'maht',
      title: 'Aine maht',
      type: 'number',
      initialValue: 20,
      description: 'Maht tundides'
    }),

    defineField({
      name: 'moodul',
      title: 'Moodul, kuhu kuulub',
      type: 'reference',
      to: [{ type: 'moodul' }]
    }),
  ], // list end
  preview: {
    select: {
      title: 'name',
      subtitle: 'moodul.name',
    },
  },
})
