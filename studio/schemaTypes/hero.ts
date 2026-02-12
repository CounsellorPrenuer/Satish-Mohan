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
            title: 'Hero Image / Logo (GIF supported)',
            type: 'image',
            description: 'Upload a PNG, JPG, or animated GIF here. GIFs will play as animations.',
            options: {
                hotspot: true,
                accept: 'image/*,.gif',
            }
        }
    ]
}
