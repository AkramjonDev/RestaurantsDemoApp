import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes/schema'; // Ensure this path is correct

export default defineConfig({
  name: 'default',
  title: 'sanity',

  projectId: 'ats6bh5v',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
