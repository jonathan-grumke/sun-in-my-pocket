'use client';
import React from 'react';

import type { Template } from 'tinacms';
import { PageBlocksImageSolo } from '../../tina/__generated__/types';
import Image from 'next/image';

export const ImageSolo = ({ data }: { data: PageBlocksImageSolo }) => {
  return <Image src={data.image!} alt={data.altText ? data.altText : ''} className='image--horizontal' width={500} height={500} />;
};

export const imageSoloBlockSchema: Template = {
  name: 'imageSolo',
  label: 'Bild',
  fields: [
    {
      type: 'image',
      label: 'Bild',
      name: 'image',
    },
    {
      type: 'string',
      label: 'Alternativtext',
      name: 'altText',
    },
  ],
};
