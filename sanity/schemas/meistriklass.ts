import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'meistriklass',
  title: 'Meistriklass',
  type: 'document',
  groups: [
    { name: 'general', title: 'Üldine' },
    { name: 'classes', title: 'Ained' }
  ],
  fieldsets: [
    { name: 'osalejad', title: 'Osalejad', options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Meistriklassi nimetus',
      type: 'string',
      group: 'general',
      validation: (Rule) => Rule.required(), // kohustulik väli
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      group: 'general',
      description: 'See on osa antud lehekülje aadressist. Kui seda muuta, siis varem jagatud lingid võivad olla katki.',
      validation: (Rule) => Rule.required().error('Väli on kohustuslik!'),
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'body',
      title: 'Kursuse kirjeldus',
      type: 'blockContent',
      group: 'general',
    }),
    defineField({
      name: 'color',
      title: 'Meistriklassi värv',
      type: 'simplerColor',
      group: 'general',
    }),

    defineField({
      name: 'ainedList',
      title: 'Ained selles meistriklassis:',
      type: 'array',
      of: [
        {
          title: 'Vali aine',
          type: 'reference',
          to: [{ type: 'aine' }],
        },
      ],
      validation: Rule => Rule.unique(),

      description: 'Kõik kohustuslikud ained selles meistriklassis.',
      group: 'classes',
    }),


    defineField({
      name: 'registrationLink',
      title: 'Registreerimise link (Google Forms)',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'minOsalejaArv',
      title: 'Minimaalne osalejate arv',
      type: 'number',
      initialValue: 10,
      fieldset: 'osalejad',
      group: 'general',
    }),

    defineField({
      name: 'maxOsalejaArv',
      title: 'Maksimaalne osalejate arv',
      type: 'number',
      initialValue: 18,
      fieldset: 'osalejad',
      group: 'general',
    }),

    defineField({
      name: 'koolitajad',
      title: 'Kes õpetavad',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'kontakt',
      title: 'Meistriklassi kontaktisik',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'payment',
      title: 'Meistriklassi eest tasumine',
      type: 'string',
      group: 'general',
    }),

  ], // fields list end
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({ title }) => {
      const subtitle = 'Viimati muudetud: '

      return {
        title,
        subtitle,
      }
    },
  },

})
