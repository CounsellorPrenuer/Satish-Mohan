export const hero = {
    name: 'hero',
    title: 'Hero Section',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Main Title',
            type: 'string'
        },
        {
            name: 'subtitle',
            title: 'Highlighted Subtitle',
            type: 'string',
            description: 'The part of the title that appears in color'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'heroImage',
            title: 'Hero Image',
            type: 'image',
            options: {
                hotspot: true,
            }
        }
    ]
}
