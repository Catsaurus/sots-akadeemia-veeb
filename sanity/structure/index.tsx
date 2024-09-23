import { AcademicCapIcon,CalendarIcon, CogIcon, DocumentIcon, EnvelopeIcon, UserGroupIcon, UserIcon, UsersIcon } from '@heroicons/react/20/solid'
import type { StructureBuilder, StructureResolver } from 'sanity/structure'

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
      S.documentTypeListItem('calendar').title('Kõik sündmused').icon(CalendarIcon),
      S.listItem().title('Meistriklasside kalender').icon(CalendarIcon).child(
        S.documentList()
            .title('Meistriklasside kalender')
            .filter('_type == "calendar" && classes->_type == "masterClass"')
      ),
      S.listItem().title('Eriklasside kalender').icon(CalendarIcon).child(
        S.documentList()
            .title('Eriklasside kalender')
            .filter('_type == "calendar" && classes->_type == "courseModule"')
      ),
      S.listItem().title('Lühiklasside kalender').icon(CalendarIcon).child(
        S.documentList()
            .title('Lühiklasside kalender')
            .filter('_type == "calendar" && classes->_type == "shortCourse"')
      ),
      S.divider(),
      S.documentTypeListItem('masterClass').title('Meistriklassid').icon(UserGroupIcon),
      S.documentTypeListItem('courseModule').title('Eriklassid').icon(UsersIcon),
      S.documentTypeListItem('shortCourse').title('Lühiklassid').icon(UserIcon),
      S.divider(),
      S.documentTypeListItem('teacher').title('Akadeemikud').icon(AcademicCapIcon),
      S.divider(),
      singletonListItem(S, 'settings', 'Seaded')
      .icon(CogIcon),
      singletonListItem(S, 'contact', 'Kontakti leht')
      .icon(EnvelopeIcon),
      S.documentTypeListItem('genericPage').title('Üldised lehed').icon(DocumentIcon),
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

