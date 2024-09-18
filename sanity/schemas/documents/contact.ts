import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Lehe pealkiri',
      type: 'string'
    }),

    defineField({
      name: 'locationCardTitle',
      title: 'Asukoha kaardi pealkiri',
      type: 'string'
    }),
    defineField({
      name: 'contactCardTitle',
      title: 'Kontakti kaardi pealkiri',
      type: 'string'
    }),

    defineField({
      name: 'teachers',
      title: 'Akadeemikud',
      type: 'array',
      of: [
        {
          title: 'Vali akadeemik',
          type: 'reference',
          to: [{ type: 'teacher' }],
        },
      ],
      validation: Rule => Rule.unique()
    }),
    defineField({
      title: "SEO",
      name: "seo",
      type: "seoMetaFields",
      group: 'seo'
    }),    
  ],
})