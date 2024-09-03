import { defineField, defineType } from "sanity";

export default defineType({
    title: 'Menu item',
    name: 'menuItem',
    type: 'object',
    fields: [
        defineField({
            type: 'string',
            name: 'name',
            title: 'Nimi'
        }),
        defineField({
            name: 'type',
            title: 'Tüüp',
            type: 'string',
            initialValue: 'reference',
            options: {
                list: [
                  { title: 'Valikmenüü', value: 'dropdown' },
                  { title: 'Link', value: 'reference' }
                ]
            }
        }),
        defineField({
            name: 'reference',
            title: 'Viide',
            type: 'reference',
            to: [{ type: 'masterClass' }, { type: 'shortCourse' }, { type: 'calendar' }, { type: 'courseModule' }],
            hidden: ({ parent }) => parent.type !== 'reference'
          }),
    ],
  })