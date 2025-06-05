import React from 'react';
import type { Collection } from 'tinacms';

const TravelDiary: Collection = {
  label: 'Reisetagebuch',
  name: 'travelDiary',
  path: 'content/travel-diary',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      return `/travel-diary/${document._sys.breadcrumbs.join('/')}`;
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
      type: 'image',
      name: 'heroImg',
      label: 'Hero Image',
      required: true,
      // @ts-ignore
      // uploadDir: () => 'assets',
    },
    {
      type: 'rich-text',
      label: 'Beschreibung',
      name: 'description',
      overrides: {
        toolbar: ['bold', 'italic', 'link'],
      },
      required: true,
    },
    {
      type: 'string',
      label: 'Autor',
      name: 'author',
      required: true,
    },
    {
      type: 'datetime',
      label: 'Datum',
      name: 'date',
      ui: {
        dateFormat: 'MMMM DD YYYY',
      },
    },
    {
      type: 'string',
      label: 'URL',
      name: 'slug',
      required: true,
    },
    {
      type: 'rich-text',
      label: 'Body',
      name: '_body',
      templates: [
        // {
        //   name: 'BlockQuote',
        //   label: 'Block Quote',
        //   fields: [
        //     {
        //       name: 'children',
        //       label: 'Quote',
        //       type: 'rich-text',
        //       overrides: {
        //         toolbar: ['bold', 'italic', 'link'],
        //       },
        //     },
        //     {
        //       name: 'authorName',
        //       label: 'Author',
        //       type: 'string',
        //     },
        //   ],
        // },
        // {
        //   name: 'DateTime',
        //   label: 'Date & Time',
        //   inline: true,
        //   fields: [
        //     {
        //       name: 'format',
        //       label: 'Format',
        //       type: 'string',
        //       options: ['utc', 'iso', 'local'],
        //     },
        //   ],
        // },
        // {
        //   name: 'NewsletterSignup',
        //   label: 'Newsletter Sign Up',
        //   fields: [
        //     {
        //       name: 'children',
        //       label: 'CTA',
        //       type: 'rich-text',
        //     },
        //     {
        //       name: 'placeholder',
        //       label: 'Placeholder',
        //       type: 'string',
        //     },
        //     {
        //       name: 'buttonText',
        //       label: 'Button Text',
        //       type: 'string',
        //     },
        //     {
        //       name: 'disclaimer',
        //       label: 'Disclaimer',
        //       type: 'rich-text',
        //       overrides: {
        //         toolbar: ['bold', 'italic', 'link'],
        //       },
        //     },
        //   ],
        //   ui: {
        //     defaultItem: {
        //       placeholder: 'Enter your email',
        //       buttonText: 'Notify Me',
        //     },
        //   },
        // },
        {
          name: 'ImageSolo',
          label: 'Bild',
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
              label: 'Alternativtext',
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
      ],
      isBody: true,
    },
  ],
};

export default TravelDiary;
