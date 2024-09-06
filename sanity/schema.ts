import { SchemaPluginOptions } from 'sanity'

import blockContent from './schemas/objects/blockContent'
import masterClass from './schemas/documents/masterClass'
import shortCourse from './schemas/documents/shortCourse'
import courseModule from './schemas/documents/courseModule'
import teacher from './schemas/documents/teacher'
import calendar from './schemas/documents/calendar'
import settings from './schemas/documents/settings'
import menuItem from './schemas/objects/menuItem'
import genericPage from './schemas/documents/genericPage'
import shortCourseTable from './schemas/objects/shortCourseTable'
import textBlock from './schemas/objects/textBlock'


export const schemaTypes = [
  blockContent,
  masterClass,
  shortCourse,
  shortCourseTable,
  courseModule,
  genericPage,
  teacher,
  settings,
  menuItem,
  textBlock,
  calendar
];

export const singletonTypes = new Set(["settings"])

export const schema: SchemaPluginOptions = {
  types: schemaTypes,
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType))
}
