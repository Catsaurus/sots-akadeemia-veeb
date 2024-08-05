import type { StructureResolver } from 'sanity/structure'
import { CalendarIcon, UsersIcon, PinIcon } from '@sanity/icons'

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Menüü')
    .items([
      S.documentTypeListItem('kalender').title('Kalender').icon(CalendarIcon),
      S.divider(),
      S.documentTypeListItem('meistriklass').title('Meistriklassid').icon(UsersIcon),
      S.documentTypeListItem('luhiklass').title('Lühiklassid').icon(PinIcon),
      S.divider(),
      S.documentTypeListItem('aine').title('Ained').icon(CalendarIcon),
      S.documentTypeListItem('moodul').title('Moodulid').icon(PinIcon),
      S.divider(),
      S.documentTypeListItem('akadeemik').title('Akadeemikud').icon(PinIcon),
      S.divider(),

      /*S.listItem()
      .id('homepage')
      .schemaType('homepage')
      .title('Avakuva')
      .child(
        S.editor()
          .id('homepage')
          .schemaType('homepage')
          .documentId('homepage')
      )*/
    ])

