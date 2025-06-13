import React from 'react';
import Image from 'next/image';

export const ImageSolo = ({ image, altText = '' }) => {
  return <Image src={image} alt={altText ? altText : ''} className='image--horizontal' width={500} height={500} />;
};
