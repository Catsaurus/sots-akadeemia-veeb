import { isUniqueAcrossAllDocuments } from '@/sanity/lib/isUniqueAcrossAllDocuments'
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
      name: 'documentNotReady',
      title: 'Leht on tegemisel',
      description: 'Selle sisselülitamisel ei saa lühiklassi linkidele klikkida ja lehte avada',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'body',
      title: 'Lühiklassi kirjeldus',
      type: 'blockContent'
    }),
    defineField({
      name: 'expectedParticipants',
      title: 'Keda ootame osalema',
      type: 'blockContent'
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
      validation: (Rule) => Rule.required(),
      options: {
        isUnique: isUniqueAcrossAllDocuments,
        source: 'name',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'registrationLink',
      title: 'Registreerimise link (Google Forms)',
      type: 'url',
      description: 'NB! Seda välja muuta ainult siis, kui tead, mis teed. URL peab sisaldama kuupäeva välja query parameetrit'
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
    })
  ], // list end
  preview: {
    select: {
      title: 'name',
      documentNotReady: 'documentNotReady'
    },
    prepare: ({ title, documentNotReady }) => {

      return {
        title,
        subtitle: 'Lühiklass' + (documentNotReady ? ' - TEGEMISEL' : '')
      }
    },
  },
})
