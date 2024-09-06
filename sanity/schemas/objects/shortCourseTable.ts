import { defineField, defineType } from "sanity";

export default defineType({
    title: 'Lühiklasside tabel',
    name: 'shortCourseTable',
    type: 'object',
    fields: [
        defineField({
            type: 'string',
            name: 'title',
            title: 'Tabeli pealkiri',
            initialValue: 'Lühiklassid'
        })
    ],
  })