import { isUniqueAcrossAllDocuments } from '@/sanity/lib/isUniqueAcrossAllDocuments'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'genericPage',
  title: 'Üldine leht',
  type: 'document',
  groups: [
    { name: 'seo', title: 'SEO' }
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Lehe pealkiri',
      type: 'string',
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
      name: 'blocks',
      title: 'Sisuplokid',
      type: 'array',
      of: [
        { type: 'textBlock' },
        { type: 'shortCourseTable' }
      ]
    }),
    defineField({
      title: "SEO",
      name: "seo",
      type: "seoMetaFields",
      group: 'seo'
    }),
  ], // list end
  preview: {
    select: {
      title: 'name', 
      subtitle: 'slug.current',
      imageUrl: 'seo.metaImage.asset.url'
    },
    prepare: ({title, subtitle, imageUrl}) => {
      return {
        title,
        subtitle,
        imageUrl
      }
    },
  },
})
