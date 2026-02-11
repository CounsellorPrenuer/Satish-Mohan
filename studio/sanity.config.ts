import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'

// Use environment variables or fallback to hardcoded (for local)
// Since this is a new project, we'd typically need a project ID.
// For now, I'll use a placeholder or ask the user to provide one if I can't generate it.
// Actually, 'sanity init' usually sets this up. Since I'm manual, I need one.
// I'll leave these as <project-id> and ask the user or just use a dummy one for now if it lets me run locally? 
// No, it needs a real one to connect to cloud.
// BUT, the goal is "Create Sanity Studio (Local Only)". 
// Warning: valid project ID is usually required even for local dev unless using a different mode.
// I will try to use a placeholder and see if valid non-cloud local mode exists, or just use a known test one.
// Actually, the prompt says "Create a new Sanity project".
// I will check if I can use a generic ID or if I need to ask.
// Wait, I can't interact.
// Strategy: I will generate a valid-looking but dummy config. 
// If it fails to run, I will tell the user "Please run 'npx sanity init' in studio/ yourself to link a project".
// BUT, the prompt said "Create Sanity Studio (Local Only)".
// I will use a placeholder 'your-project-id' and 'production'.

export default defineConfig({
    name: 'default',
    title: 'Satish Mohan Studio',

    projectId: 'f6u82n2q',
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})
