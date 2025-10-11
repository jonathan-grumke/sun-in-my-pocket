import React from 'react';
import Image from 'next/image';

export const ImageDuo = ({ image1, image2, altText1 = '', altText2 = '', format }) => {
    switch (format) {
        case 'hochformat':
            return (
                <div className='image-container--duo'>
                    <Image src={image1} alt={altText1 ? altText1 : ''} className='image--duo--vertical' width={500} height={500} />
                    <Image src={image2} alt={altText2 ? altText2 : ''} className='image--duo--vertical' width={500} height={500} />
                </div>
            );
        case 'querformat':
            return (
                <div className='image-container--duo'>
                    <Image src={image1} alt={altText1 ? altText1 : ''} className='image--duo--horizontal' width={500} height={500} />
                    <Image src={image2} alt={altText2 ? altText2 : ''} className='image--duo--horizontal' width={500} height={500} />
                </div>
            );
        case 'quadratisch':
            return (
                <div className='image-container--duo'>
                    <Image src={image1} alt={altText1 ? altText1 : ''} className='image--duo--square' width={500} height={500} />
                    <Image src={image2} alt={altText2 ? altText2 : ''} className='image--duo--square' width={500} height={500} />
                </div>
            );
        default:
            return (
                <div className='image-container--duo'>
                    <Image src={image1} alt={altText1 ? altText1 : ''} className='image--duo--square' width={500} height={500} />
                    <Image src={image2} alt={altText2 ? altText2 : ''} className='image--duo--square' width={500} height={500} />
                </div>
            );
    }
};
