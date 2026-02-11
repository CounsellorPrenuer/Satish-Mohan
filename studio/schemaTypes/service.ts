export const service = {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'serviceId',
            title: 'Service ID',
            type: 'string',
            description: 'Unique identifier for routing (e.g., life-coaching)'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'icon',
            title: 'Icon Name',
            type: 'string',
            description: 'Lucide icon name (e.g., Heart, Zap)'
        },
        {
            name: 'price',
            title: 'Price Display',
            type: 'string',
        },
        {
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }]
        },
        {
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false
        },
        {
            name: 'displayOrder',
            title: 'Display Order',
            type: 'number'
        }
    ],
}
