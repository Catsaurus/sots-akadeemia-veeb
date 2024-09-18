import { isUniqueAcrossAllDocuments } from '@/sanity/lib/isUniqueAcrossAllDocuments'
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
      name: 'documentNotReady',
      title: 'Leht on tegemisel',
      description: 'Selle sisselülitamisel ei saa meistriklassi linkidele klikkida ja lehte avada',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      group: 'general',
      description: 'See on osa antud lehekülje aadressist. Kui seda muuta, siis varem jagatud lingid võivad olla katki.',
      validation: (Rule) => Rule.required().error('Väli on kohustuslik!'),
      options: {
        isUnique: isUniqueAcrossAllDocuments,
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'shortDescription',
      title: 'Meistriklassi lühikirjeldus',
      type: 'text',
      group: 'general',
    }),
    defineField({
      name: 'body',
      title: 'Meistriklassi kirjeldus',
      type: 'blockContent',
      group: 'general',
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
      initialValue: 'Tartu',
    }),
    defineField({
      name: 'address',
      title: 'Toimumiskoha aadress',
      type: 'string',
      initialValue: 'Suur Kaar 53, Tartu Sissepääs hoovipoolsest uksest',
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
      name: 'contactPerson',
      title: 'Kontaktisik',
      description: 'Vali akadeemik, kelle andmed kuvatakse kontakti plokis',
      type: 'reference',
      to: [{ type: 'teacher' }],
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registreerimise link (Google Forms)',
      type: 'url',
      group: 'general',
      description: 'Kui see puudub, kuvatakse "Registreeri huvi linki". NB! Seda välja muuta ainult siis, kui tead, mis teed. URL peab sisaldama kuupäeva välja query parameetrit'
    }),

  ], // fields list end
  preview: {
    select: {
      title: 'name',
      documentNotReady: 'documentNotReady'
    },
    prepare: ({ title, documentNotReady }) => {

      return {
        title,
        subtitle: 'Meistriklass' + (documentNotReady ? ' - TEGEMISEL' : '')
      }
    },
  }

});
