import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'logo',
            title: 'Logo (supports PNG, JPG, GIF, SVG, WebP)',
            type: 'image',
            description: 'Upload your logo here. GIFs are supported for animated logos.',
            options: {
                accept: 'image/*,.gif',
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            initialValue: 'Innervea',
        }),
    ],
    preview: {
        select: {
            title: 'siteName',
            media: 'logo',
        },
    },
})
