import { isUniqueAcrossAllDocuments } from '@/sanity/lib/isUniqueAcrossAllDocuments'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'shortCourse',
  title: 'Lühiklass',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' }
  ],
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
      name: 'isSimplifiedShortCourse',
      title: 'Kas lühiklassi müüakse ainult koos meistriklassiga?',
      description: 'Mõistlik sisse lülitada siis, kui lühiklassile EI SAA eraldi registreerida. Lülita sisse, kui lühiklass on kindlasti seotud konkreetse meistriklassiga. Kui on sisse lülitatud, siis ei kuvata lühiklassi muudes kohtades.',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'documentNotReady',
      title: 'Leht on tegemisel',
      description: 'Selle sisselülitamisel ei saa lühiklassi linkidele klikkida ja lehte avada',
      type: 'boolean',
      initialValue: false,
      hidden: ({document}) => !!document?.isSimplifiedShortCourse
    }),
    defineField({
      name: 'body',
      title: 'Lühiklassi kirjeldus',
      type: 'blockContent'
    }),
    defineField({
      name: 'expectedParticipants',
      title: 'Keda ootame osalema',
      type: 'blockContent',
      hidden: ({document}) => !!document?.isSimplifiedShortCourse
    }),
    defineField({
      name: 'registrationAndPaymentInfo',
      title: 'Registreerumine ja tasumine',
      type: 'blockContent',
      hidden: ({document}) => !!document?.isSimplifiedShortCourse
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
      name: 'minParticipants',
      title: 'Minimaalne osalejate arv',
      type: 'string',
      fieldset: 'participants',
      hidden: ({document}) => !!document?.isSimplifiedShortCourse
    }),
    defineField({
      name: 'maxParticipants',
      title: 'Maksimaalne osalejate arv',
      type: 'number',
      initialValue: 18,
      fieldset: 'participants',
      hidden: ({document}) => !!document?.isSimplifiedShortCourse
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
      type: 'number',
      hidden: ({document}) => !!document?.isSimplifiedShortCourse
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
      description: 'Kui see puudub, kuvatakse "Registreeri huvi linki". NB! Seda välja muuta ainult siis, kui tead, mis teed. URL peab sisaldama kuupäeva välja query parameetrit',
      hidden: ({document}) => !!document?.isSimplifiedShortCourse
    }),
    
    defineField({
      title: "SEO",
      name: "seo",
      type: "seoMetaFields",
      group: 'seo',
      // hidden: ({document}) => !!document?.isSimplifiedShortCourse
    }),
  ], // list end
  preview: {
    select: {
      title: 'name',
      documentNotReady: 'documentNotReady'
    },
    prepare: ({ title, documentNotReady }) => {

      return {
        title,
        subtitle: 'Lühiklass' + (documentNotReady ? ' - TEGEMISEL' : ''),
        media: <strong>LK</strong>
      }
    },
  },
})
