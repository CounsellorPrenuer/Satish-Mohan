export const about = {
    name: 'about',
    title: 'About Section',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            initialValue: 'The Innervea Story'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{ type: 'block' }]
        },
        {
            name: 'profileImage',
            title: 'Profile Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'value', type: 'string', title: 'Value' },
                    { name: 'label', type: 'string', title: 'Label' },
                    { name: 'icon', type: 'string', title: 'Icon Name (Lucide)' },
                    { name: 'description', type: 'string', title: 'Description' }
                ]
            }]
        }
    ]
}
