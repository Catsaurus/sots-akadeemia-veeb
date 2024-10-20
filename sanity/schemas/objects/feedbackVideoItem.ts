import { defineField, defineType } from "sanity";

export default defineType({
    title: 'Kliendi tagasiside',
    name: 'feedbackVideoItem',
    type: 'object',
    fields: [
        defineField({
            type: 'string',
            name: 'name',
            title: 'Nimi'
        }),
        defineField({
            type: 'string',
            name: 'description',
            title: 'Kirjeldus'
        }),
        defineField({
            type: 'wistiaMedia',
            name: 'wistiaVideo',
            title: 'Videoklipp'
        }),
        defineField({
            type: 'boolean',
            name: 'videoOrientationPortrait',
            title: 'Video on püstformaadis'
        })
    ],
  })