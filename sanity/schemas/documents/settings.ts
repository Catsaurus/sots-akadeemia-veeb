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
    }
  ],
  fields: [
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