import type { StructureBuilder, StructureResolver } from 'sanity/structure'
import { CalendarIcon, UsersIcon, PinIcon, CogIcon, EnvelopeIcon } from '@sanity/icons'

const singletonListItem = (
  S: StructureBuilder,
  typeName: string,
  title?: string
) =>
  S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName))

export const structure: StructureResolver = (S) =>
  S.list()
    .id('root')
    .title('Menüü')
    .items([
      singletonListItem(S, 'settings', 'Seaded')
      .icon(CogIcon),
      singletonListItem(S, 'contact', 'Kontakti leht')
      .icon(EnvelopeIcon),
      S.divider(),
      S.documentTypeListItem('genericPage').title('Üldised lehed').icon(PinIcon),
      S.divider(),
      S.documentTypeListItem('calendar').title('Kalender').icon(CalendarIcon),
      S.divider(),
      S.documentTypeListItem('masterClass').title('Meistriklassid').icon(UsersIcon),
      S.documentTypeListItem('courseModule').title('Eriklassid').icon(PinIcon),
      S.documentTypeListItem('shortCourse').title('Lühiklassid').icon(CalendarIcon),
      S.divider(),
      S.documentTypeListItem('teacher').title('Akadeemikud').icon(PinIcon),
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

