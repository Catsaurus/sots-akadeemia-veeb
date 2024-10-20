import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
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
      name: 'clientFeedback',
      title: 'Klientide tagasiside',
      type: 'array',
      of: [
        {
          title: 'Lisa tagasiside',
          type: 'feedbackVideoItem'
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