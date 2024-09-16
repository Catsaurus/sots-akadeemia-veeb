import { isUniqueAcrossAllDocuments } from '@/sanity/lib/isUniqueAcrossAllDocuments'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'courseModule',
  title: 'Eriklass',
  type: 'document',
  fieldsets: [
    { name: 'participants', title: 'Osalejad', options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Eriklassi nimetus',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Eriklassi kirjeldus',
      type: 'blockContent',
    }),
    defineField({
      name: 'expectedParticipants',
      title: 'Keda ootame osalema',
      type: 'text'
    }),
    defineField({
      name: 'registrationAndPaymentInfo',
      title: 'Registreerumine ja tasumine',
      type: 'blockContent'
    }),
    defineField({
      name: 'organizationalInformation',
      title: 'Korralduslik info (päevakava jm)',
      type: 'blockContent'
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description: 'See on osa antud lehekülje aadressist. Kui seda muuta, siis varem jagatud lingid võivad olla katki.',
      validation: (Rule) => Rule.required().error('Väli on kohustuslik!'),
      options: {
        isUnique: isUniqueAcrossAllDocuments,
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'color',
      title: 'Eriklassi värv',
      type: 'color',
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
      name: 'registrationLink',
      title: 'Registreerimise link (Google Forms)',
      type: 'url',
    }),
    defineField({
      name: 'minParticipants',
      title: 'Minimaalne osalejate arv',
      type: 'number',
      initialValue: 10,
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
      title: 'Eriklassi ainemaht',
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
    }),
    defineField({
      name: 'contactPerson',
      title: 'Kontaktisik',
      description: 'Vali akadeemik, kelle andmed kuvatakse kontakti plokis',
      type: 'reference',
      to: [{ type: 'teacher' }],
    }),
  ], // list end
  preview: {
    select: {
      title: 'name', 
      color: 'color',
      media: '#ccc',
      subtitle: 'shortDescription'
    },
    prepare: ({ title, subtitle }) => {
      return {
        title,
        subtitle,

      }
    },
  },
})
