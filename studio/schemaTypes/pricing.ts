export const pricing = {
    name: 'pricing',
    title: 'Pricing Category',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'Category ID',
            type: 'string',
            description: 'e.g., "8-9-students" (Must match frontend code)'
        },
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string'
        },
        {
            name: 'heading',
            title: 'Section Heading',
            type: 'string'
        },
        {
            name: 'subheading',
            title: 'Section Subheading',
            type: 'string'
        },
        {
            name: 'plans',
            title: 'Plans',
            type: 'array',
            of: [{
                type: 'object',
                fields: [
                    { name: 'id', type: 'string', title: 'Plan ID' },
                    { name: 'name', type: 'string', title: 'Plan Name' },
                    { name: 'price', type: 'string', title: 'Display Price' },
                    { name: 'for', type: 'string', title: 'Target Audience' },
                    {
                        name: 'features',
                        title: 'Features',
                        type: 'array',
                        of: [{
                            type: 'object',
                            fields: [
                                { name: 'text', type: 'string' },
                                { name: 'included', type: 'boolean' }
                            ]
                        }]
                    },
                    { name: 'buttonText', type: 'string', title: 'Button Text' },
                    { name: 'highlighted', type: 'boolean', title: 'Highlighted' },
                    { name: 'paymentButtonId', type: 'string', title: 'Razorpay Button ID' }
                ]
            }]
        }
    ]
}
