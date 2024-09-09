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