import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'uokpqs',

  projectId: 'bsr6ngqu',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  api:{
    cors: {
      origin: ['http://localhost:3000', 'https://uokpq.vercel.app'],
      credentials: true
    },
  }
})
