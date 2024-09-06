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
  })