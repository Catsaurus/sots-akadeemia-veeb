import { SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import meistriklass from './schemas/meistriklass'
import aine from './schemas/aine'
import moodul from './schemas/moodul'
import luhiklass from './schemas/luhiklass'
import akadeemik from './schemas/akadeemik'
import kalender from './schemas/kalender'


export const schemaTypes = [blockContent, meistriklass, aine, moodul, luhiklass, akadeemik, ]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [kalender, meistriklass, luhiklass, moodul, aine, akadeemik, blockContent]
}
