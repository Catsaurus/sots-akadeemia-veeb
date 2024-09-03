import { SchemaPluginOptions } from 'sanity'

import blockContent from './schemas/blockContent'
import masterClass from './schemas/masterClass'
import shortCourse from './schemas/shortCourse'
import courseModule from './schemas/courseModule'
import teacher from './schemas/teacher'
import calendar from './schemas/calendar'
import settings from './schemas/settings'
import menuItem from './schemas/menuItem'


export const schemaTypes = [blockContent, masterClass, shortCourse, courseModule, teacher, settings, menuItem];
export const singletonTypes = new Set(["settings"])

export const schema: SchemaPluginOptions = {
  types: [calendar, masterClass, shortCourse, courseModule, teacher, blockContent, settings, menuItem],
  templates: (templates) =>
    templates.filter(({ schemaType }) => !singletonTypes.has(schemaType))
}
