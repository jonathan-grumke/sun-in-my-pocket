'use client';
import React from 'react';

import type { Template } from 'tinacms';
import { PageBlocksImageDuo } from '../../tina/__generated__/types';
import Image from 'next/image';

export const ImageDuo = ({ data }: { data: PageBlocksImageDuo }) => {
  const formatClass = {
    hochformat: 'image--duo--vertical',
    querformat: 'image--duo--horizontal',
    quadratisch: 'image--duo--square',
  };
  return (
    <div className='image-container--duo'>
      <Image src={data.image1!} alt={data.altText1 ? data.altText1 : ''} className={formatClass[data.format]} width={500} height={500} />
      <Image src={data.image2!} alt={data.altText2 ? data.altText2 : ''} className={formatClass[data.format]} width={500} height={500} />
    </div>
  );
};

export const imageDuoBlockSchema: Template = {
  name: 'imageDuo',
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
};
