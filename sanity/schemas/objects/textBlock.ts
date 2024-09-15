import { defineField, defineType } from "sanity";

export default defineType({
    title: 'Tekstikast',
    name: 'textBlock',
    type: 'object',
    fields: [
        defineField({
            name: 'content',
            title: 'Sisu',
            type: 'blockContent'
        })
    ],
    preview: {
        select: {
          blocks: 'content'
        },
        prepare(value) {
          const block = (value.blocks || []).find((block: any) => block._type === 'block')
          return {
            title: block
              ? block.children
                .map((span: any) => span.text)
                .join('')
              : 'No title'
          }
        }
      }
  })