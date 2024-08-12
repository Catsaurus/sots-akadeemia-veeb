'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import { structure } from './sanity/struckture'
import { defaultDocumentNode } from './sanity/struckture/defaultDocumentNode'
import { media } from 'sanity-plugin-media'
import { simplerColorInput } from 'sanity-plugin-simpler-color-input'


// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schema'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  plugins: [
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
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: 'rgba',
      defaultColorList: [
        { label: 'blue', value: '#7DD5D0' },
        { label: 'pink', value: '#C299A1' },
        { label: 'orange', value: '#CE6E52' },
        { label: 'green', value: '#B6C98C' },
        { label: 'yellow', value: '#E3D4AF' },
        { label: 'Custom...', value: 'custom' },
      ],
      enableSearch: true,
    })
  ],
  tools: (prev, {currentUser}) => {
    const isAdmin = currentUser?.roles.some((role) => role.name === 'administrator')
    if (isAdmin) { return prev } return prev.filter((tool) => tool.name !== 'vision')
  },
})
