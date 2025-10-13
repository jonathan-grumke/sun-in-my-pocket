import type { Collection } from 'tinacms';

const TravelGuide: Collection = {
    label: 'Reiseziele',
    name: 'travelGuide',
    path: 'content/travel-guides',
    format: 'mdx',
    ui: {
        router: ({ document }) => {
            return `/travel-guides/${document._sys.breadcrumbs.join('/')}`;
        },
    },
    fields: [
        {
            type: 'string',
            label: 'Titel',
            name: 'title',
            isTitle: true,
            required: true,
        },
        {
            type: 'string',
            label: 'Veröffentlichen',
            name: 'published',
            required: true,
            options: ['Ja', 'Nein'],
        },
        {
            type: 'image',
            name: 'heroImg',
            label: 'Hero Image',
            required: true,
        },
        {
            type: 'string',
            label: 'Beschreibung',
            name: 'description',
            ui: {
                component: "textarea",
            },
            required: true,
        },
        {
            type: 'datetime',
            label: 'Datum',
            name: 'date',
            required: true,
            ui: {
                dateFormat: 'MMMM DD YYYY',
            },
        },
        {
            type: 'string',
            label: 'Kontinent',
            name: 'continent',
            required: true,
            options: ['Afrika', 'Asien', 'Europa', 'Nordamerika', 'Ozeanien', 'Südamerika'],
        },
        {
            type: 'string',
            label: 'Land',
            name: 'country',
            required: true,
        },
        {
            type: 'string',
            label: 'Stadt',
            name: 'city',
            required: false,
        },
        {
            type: 'rich-text',
            label: 'Body',
            name: '_body',
            templates: [
                {
                    name: 'ImageSolo',
                    label: '1 Bild',
                    fields: [
                        {
                            name: 'image',
                            label: 'Bild',
                            type: 'image',
                            required: true,
                        },
                        {
                            name: 'format',
                            label: 'Format',
                            type: 'string',
                            options: ['hochformat', 'querformat', 'quadratisch'],
                            required: true,
                        },
                        {
                            name: 'altText',
                            label: 'Alternativtext (optional)',
                            type: 'string',
                        },
                    ],
                },
                {
                    name: 'ImageDuo',
                    label: '2 Bilder',
                    fields: [
                        {
                            name: 'image1',
                            label: 'linkes Bild',
                            type: 'image',
                            required: true,
                        },
                        {
                            name: 'image2',
                            label: 'rechtes Bild',
                            type: 'image',
                            required: true,
                        },
                        {
                            name: 'format',
                            label: 'Format',
                            type: 'string',
                            options: ['hochformat', 'querformat', 'quadratisch'],
                            required: true,
                        },
                        {
                            name: 'altText1',
                            label: 'Alternativtext links',
                            type: 'string',
                        },
                        {
                            name: 'altText2',
                            label: 'Alternativtext rechts',
                            type: 'string',
                        },
                    ],
                },
                {
                    name: 'FunFact',
                    label: 'Fun Fact',
                    fields: [
                        {
                            name: 'content',
                            label: 'Inhalt',
                            type: 'rich-text',
                            overrides: {
                                toolbar: ['bold', 'italic', 'link'],
                            },
                        },
                    ],
                },
                {
                    name: 'Tipp',
                    label: 'Tipp',
                    fields: [
                        {
                            name: 'content',
                            label: 'Inhalt',
                            type: 'rich-text',
                            overrides: {
                                toolbar: ['bold', 'italic', 'link'],
                            },
                        },
                    ],
                },
                {
                    name: 'Info',
                    label: 'Info',
                    fields: [
                        {
                            name: 'icon',
                            label: 'Icon',
                            type: 'string',
                            options: ['Auto', 'Bus', 'Eintritt', 'Erde', 'Kosten', 'Tipp', 'Unterkunft', 'Zeit']
                        },
                        {
                            name: 'title',
                            label: 'Titel',
                            type: 'string',
                        },
                        {
                            name: 'content',
                            label: 'Inhalt',
                            type: 'rich-text',
                            overrides: {
                                toolbar: ['bold', 'italic', 'link'],
                            },
                        },
                    ]
                }
            ],
            isBody: true,
        },
    ],
};

export default TravelGuide;
