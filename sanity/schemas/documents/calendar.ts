import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'calendar',
  type: 'document',
  title: 'Sündmus',
  fields: [
    defineField({
      name: 'name',
      title: 'Sündmuse nimetus',
      type: 'string',
    }),
    defineField({
      name: 'classes',
      title: 'Vali klass',
      type: 'reference',
      to: [{ type: 'shortCourse' }, { type: 'masterClass' }],
    }),

    defineField({
      name: 'timeConfirmed',
      title: 'Aeg kinnitatud?',
      type: 'boolean'
    }),

    defineField({
      title: 'Kursuse algus',
      name: 'startDate',
      type: 'date'
    }),

    defineField({
      title: 'Kursuse lõpp',
      name: 'endDate',
      type: 'date'
    }),

    // klassi valik
    // kas klass on kinnitatud
    // kui on kinnitatud, siis kuupäev
    // kui ei ole kinnitatud, siis aastaaeg + aasta
    // 


  ], // list end
})
