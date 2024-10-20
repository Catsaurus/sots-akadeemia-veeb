import { SchemaPluginOptions } from 'sanity'

import calendar from './schemas/documents/calendar'
import contact from './schemas/documents/contact'
import courseModule from './schemas/documents/courseModule'
import genericPage from './schemas/documents/genericPage'
import homePage from './schemas/documents/homePage'
import masterClass from './schemas/documents/masterClass'
import settings from './schemas/documents/settings'
import shortCourse from './schemas/documents/shortCourse'
import teacher from './schemas/documents/teacher'
import blockContent from './schemas/objects/blockContent'
import feedbackVideoItem from './schemas/objects/feedbackVideoItem'
import menuItem from './schemas/objects/menuItem'
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
  calendar,
  contact,
  homePage,
  feedbackVideoItem
];

export const singletonTypes = new Set(['settings', 'contact', 'homePage']);

export const schema: SchemaPluginOptions = {
  types: schemaTypes,
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType))
}
