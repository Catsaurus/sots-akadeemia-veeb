import { client } from '@/sanity/lib/client'
import { isUniqueAcrossAllDocuments } from '@/sanity/lib/isUniqueAcrossAllDocuments'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'courseModule',
  title: 'Eriklass',
  type: 'document',
  groups: [
    { name: 'shortCourses', title: 'Lühiklassid' }
  ],
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
      name: 'documentNotReady',
      title: 'Leht on tegemisel',
      description: 'Selle sisselülitamisel ei saa eriklassi linkidele klikkida ja lehte avada',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'body',
      title: 'Eriklassi kirjeldus',
      type: 'blockContent',
    }),
    defineField({
      name: 'notSeparatelyTakeable',
      title: 'Ei ole eraldiseisvalt võetav',
      description: 'Selle sisselülitamisel ei kuvata eriklassi välja eriklasside nimekirjas ja seda ei saa eraldi võtta.',
      type: 'boolean',
      initialValue: false
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
      initialValue: 'Tartu',
    }),
    defineField({
      name: 'address',
      title: 'Toimumiskoha aadress',
      initialValue: 'Suur Kaar 53, Tartu Sissepääs hoovipoolsest uksest',
      type: 'string',
    }),
    defineField({
      name: 'courses',
      title: 'Lühiklassid selles eriklassis:',
      type: 'array',
      of: [
        {
          title: 'Vali lühiklass',
          type: 'reference',
          to: [{ type: 'shortCourse' }],
        },
      ],
      validation: (Rule) => Rule.custom(async (arrayItems, context) => {
        if (!arrayItems || arrayItems.length === 0) return true;
        const currentDocumentId = context.document!._id.replace('drafts.', '');

        const params = {
          draft: `drafts.${currentDocumentId}`,
          published: currentDocumentId
        }
        const existingDocuments = await client.fetch(`
          *[_type == 'courseModule' && !(_id in [$draft, $published])] {
            _id,
            courses[]{
              ...,
              "name": @->name
            }
          }
        `, params);

        const allOtherArrayItems = existingDocuments.flatMap((doc: any) => doc.courses || []);
        const duplicateItem = allOtherArrayItems.find((otherItem: any) => arrayItems.some((item: any) => item._ref === otherItem._ref))

        if (duplicateItem) {
          return  `Lühiklass "${duplicateItem.name}" juba on lisatud teises eriklassis!`
        }

        return true;
      }),
      description: 'Eriklassi kuuluvad lühiklassid kuvatakse välja selles järjekorras, milles nad siia nimekirja on lisatud.',
      group: 'shortCourses',
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
      description: 'Kui see puudub, kuvatakse "Registreeri huvi linki". NB! Seda välja muuta ainult siis, kui tead, mis teed. URL peab sisaldama kuupäeva välja query parameetrit'
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
        subtitle: 'Eriklass' + (documentNotReady ? ' - TEGEMISEL' : '')
      }
    },
  }
})
