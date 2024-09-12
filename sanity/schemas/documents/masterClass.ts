import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'masterClass',
  title: 'Meistriklass',
  type: 'document',
  groups: [
    { name: 'general', title: 'Üldine' },
    { name: 'shortCourses', title: 'Lühiklassid' }
  ],
  fieldsets: [
    { name: 'participants', title: 'Osalejad', options: { columns: 2 } },
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
      name: 'shortDescription',
      title: 'Meistriklassi lühikirjeldus',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'body',
      title: 'Meistriklassi kirjeldus',
      type: 'blockContent',
      group: 'general',
    }),
    defineField({
      name: 'color',
      title: 'Meistriklassi värv',
      type: 'color',
      group: 'general',
      options: {
        disableAlpha: true,
        colorList: [
          '#7DD5D0',
          '#C299A1',
          '#CE6E52',
          '#B6C98C',
          '#E3D4AF'
        ]
      }
    }),

    defineField({
      name: 'courses',
      title: 'Lühiklassid selles meistriklassis:',
      type: 'array',
      of: [
        {
          title: 'Vali lühiklass',
          type: 'reference',
          to: [{ type: 'shortCourse' }],
        },
      ],
      validation: Rule => Rule.unique(),

      description: 'Kõik kohustuslikud lühiklassid selles meistriklassis.',
      group: 'shortCourses',
    }),


    defineField({
      name: 'registrationLink',
      title: 'Registreerimise link (Google Forms)',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'minParticipants',
      title: 'Minimaalne osalejate arv',
      type: 'number',
      initialValue: 10,
      fieldset: 'participants',
      group: 'general',
    }),

    defineField({
      name: 'maxParticipants',
      title: 'Maksimaalne osalejate arv',
      type: 'number',
      initialValue: 18,
      fieldset: 'participants',
      group: 'general',
    }),
    defineField({
      name: 'courseSize',
      title: 'Meistriklassi ainemaht',
      type: 'number',
      initialValue: 168,
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
      name: 'teachers',
      title: 'Kes õpetavad',
      type: 'array',
      of: [
        {
          title: 'Vali akadeemik',
          type: 'reference',
          to: [{ type: 'teacher' }],
        },
      ],
      validation: Rule => Rule.unique(),
      group: 'general',
    }),
    defineField({
      name: 'contact',
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
      subtitle: 'shortDescription'
    },
    prepare: ({ title, subtitle }) => {

      return {
        title,
        subtitle
      }
    },
  },

})
