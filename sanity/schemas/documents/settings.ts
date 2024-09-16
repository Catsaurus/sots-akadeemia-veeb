import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO'
    },
    {
      name: 'menu',
      title: 'Menüü'
    },
    {
      name: 'footer',
      title: 'Jalus'
    },
    {
      name: 'company',
      title: 'Ettevõte andmed'
    },
    {
      name: 'registerInterestLinks',
      title: 'Registreeri huvi lingid'
    }
  ],
  fields: [
    defineField({
      name: 'address',
      title: 'Ettevõtte aadress',
      type: 'string',
      group: 'company'
    }),
    defineField({
      name: 'mainContactEmail',
      title: 'Ettevõtte põhikontakt, email',
      type: 'string',
      group: 'company'
    }),
    defineField({
      name: 'mainContactPhone',
      title: 'Ettevõtte põhikontakt, telefon',
      type: 'string',
      group: 'company'
    }),
    defineField({
      name: 'companyCode',
      title: 'Registrikood',
      type: 'string',
      group: 'company'
    }),
    defineField({
      name: 'bankIban',
      title: 'Panga IBAN',
      type: 'string',
      group: 'company'
    }),
    defineField({
      name: 'title',
      title: 'Lehe pealkiri',
      type: 'string',
      group: 'seo'
    }),
    defineField({
      name: 'description',
      title: 'Lehe kirjeldus',
      type: 'string',
      group: 'seo'
    }),
    defineField({
      name: 'registerInterestShortCourse',
      title: 'Registreeri huvi lühiklassile',
      type: 'url',
      group: 'registerInterestLinks',
      validation: Rule => Rule.required().uri({
        scheme: ['https']
      }),
      description: 'NB! Seda välja muuta ainult siis, kui tead, mis teed. URL peab sisaldama klassi nime välja query parameetrit'
    }),
    defineField({
      name: 'registerInterestCourseModule',
      title: 'Registreeri huvi eriklassile',
      type: 'url',
      group: 'registerInterestLinks',
      validation: Rule => Rule.required().uri({
        scheme: ['https']
      }),
      description: 'NB! Seda välja muuta ainult siis, kui tead, mis teed. URL peab sisaldama klassi nime välja query parameetrit'

    }),
    defineField({
      name: 'registerInterestMasterClass',
      title: 'Registreeri huvi meistriklassile',
      type: 'url',
      group: 'registerInterestLinks',
      validation: Rule => Rule.required().uri({
        scheme: ['https']
      }),
      description: 'NB! Seda välja muuta ainult siis, kui tead, mis teed. URL peab sisaldama klassi nime välja query parameetrit'
    }),
    defineField({
      name: 'menu',
      title: 'Menüü',
      type: 'array',
      of: [
        {
          type: 'menuItem'
        }
      ],
      group: 'menu'
    }),
    defineField({
      name: 'footerContent',
      title: 'Jaluse sisu',
      type: 'blockContent',
      group: 'footer'
    }),
  ],
})