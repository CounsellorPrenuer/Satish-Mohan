import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'event',
    title: 'Event',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Event Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'date',
            title: 'Date and Time',
            type: 'datetime',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'location',
            title: 'Location (Online/Offline)',
            type: 'string',
            initialValue: 'Online',
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'image',
            title: 'Event Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'registrationLink',
            title: 'Registration Link',
            type: 'url',
            description: 'Link to Google Form, Zoom, or payment page',
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active?',
            type: 'boolean',
            description: 'Turn off to hide from the website',
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'date',
            media: 'image',
        },
    },
})
