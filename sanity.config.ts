'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import { structure } from './sanity/structure'
import { defaultDocumentNode } from './sanity/structure/defaultDocumentNode'
import { media } from 'sanity-plugin-media'
import { table } from '@sanity/table';
import { seoMetaFields } from 'sanity-plugin-seo';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import { schema, singletonTypes } from './sanity/schema'
import { presentationTool } from 'sanity/presentation'
import { colorInput } from '@sanity/color-input'

// Define the actions that should be available for singleton documents
const singletonActions = new Set(["publish", "discardChanges", "restore"])

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema: schema,
  plugins: [
    seoMetaFields(),
    structureTool({structure, defaultDocumentNode}),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
    media({ creditLine: { enabled: true,
        // boolean - enables an optional "Credit Line" field in the plugin.
        // Used to store credits e.g. photographer, licence information
        excludeSources: ['unsplash'],
        // string | string[] - when used with 3rd party asset sources, you may
        // wish to prevent users overwriting the creditLine based on the `source.name`
      },
    }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: '/api/draft-mode/enable',
        },
      },
    }),
    colorInput(),
    table()
  ],
  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')
    if (isAdmin) { return prev } return prev.filter((tool) => tool.name !== 'vision')
  },
document: {
  actions: (input, context) =>
    singletonTypes.has(context.schemaType)
      ? input.filter(({ action }) => action && singletonActions.has(action))
      : input,
} 
})
