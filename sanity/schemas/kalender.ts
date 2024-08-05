import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'kalender',
  type: 'document',
  title: 'Sündmus',
  fields: [

      defineField({
        name: 'ained',
        title: 'Vali klass',
        type: 'reference',
        to: [{ type: 'aine' }],
      }),

      defineField({
        name: 'timeComfirmed',
        title: 'Aeg kinnitatud?',
        type: 'boolean'
      }),

      defineField({
        title: 'Launch Scheduled At',
        name: 'launchAt',
        type: 'datetime'
      }),

    // klassi valik
    // kas klass on kinnitatud
    // kui on kinnitatud, siis kuupäev
    // kui ei ole kinnitatud, siis aastaaeg + aasta
    // 


  ], // list end
})
