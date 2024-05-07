import profile from '@/public/json/personal_data.json'

export const dataSeo = {
    url: 'https://thomasmoserdev.com',
    title: 'Thomas Moser | Software Developer',
    description:
        'My personal website to share my projects, blogs, and other stuff.',
    ogimage:
        'https://res.cloudinary.com/dluezegi8/image/upload/v1714490007/images/upload/thomasmoserdev.com/default_social.png',
    name: 'Thomas Moser',
};

export const dataOpenGraph = {
    url: dataSeo.url,
    title: dataSeo.title,
    description: dataSeo.description,
    images: [
        {
            url: dataSeo.ogimage,
            width: 1280,
            height: 720,
            alt: 'Social',
            type: 'image/jpeg',
        },
    ],
    siteName: dataSeo.title,
    locale: 'en_US',
    type: 'website',
};

export const dataFooter = [
    {
        menu: 'Social',
        content: [
            { name: 'Github', href: profile.Github, target: '_blank' },
            { name: 'Instagram', href: profile.Instagram, target: '_blank' },
            { name: 'Linkedin', href: profile.LinkedIn, target: '_blank' },
            { name: 'Youtube', href: profile.Youtube, target: '_blank' }
        ],
    },
    {
        menu: 'General',
        content: [
            { name: 'Home', href: '/', target: '_self' },
            { name: 'Projects', href: '/#projects', target: '_self' },
            { name: 'Blog', href: '/blog', target: '_self' },
            { name: 'Activities', href: '/activities', target: '_self' },
        ],
    },
    {
        menu: 'Extra',
        content: [
            { name: 'Resume', href: '/pdf/CV_Thomas_MOSER.pdf', target: '_blank' },
            { name: 'Analytics', href: '/analytics', target: '_self' },
            { name: 'Source Code', href: profile.Repository, target: '_blank' },

        ],
    },
];
