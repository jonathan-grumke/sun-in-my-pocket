import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { ImageSolo } from '@/components/images/image-solo';

export const revalidate = 300;

export default async function Contact() {
  return (
    <Layout>
      <h1 className='space-after'>Kontakt</h1>
      <div className='contact-row space-after'>
        <div className='grid-image'>
          <img alt='' src='/assets/icons/instagram.png' />
        </div>
        <div className='grid-text'>
          <p>
            Du willst noch mehr von unserer Reise sehen? Dann folge uns auf <strong>Instagram</strong>!
          </p>
        </div>
        <div className='grid-button'>
          <a href='https://www.instagram.com/_me_monique/' target='_blank'>
            <button className='button--primary'>Folge uns</button>
          </a>
        </div>
      </div>
      <div className='contact-row space-after'>
        <div className='grid-image'>
          <img alt='' src='/assets/icons/youtube.png' />
        </div>
        <div className='grid-text'>
          <p>
            Hin und wieder laden wir Videos von unserer Reise auf
            <strong>YouTube</strong> hoch. Schau sie dir gerne an!
          </p>
        </div>
        <div className='grid-button'>
          <a href='https://www.youtube.com/@jonathangrumke' target='_blank'>
            <button className='button--primary'>Zum Kanal</button>
          </a>
        </div>
      </div>
      <div className='contact-row space-after'>
        <div className='grid-image'>
          <img alt='' src='/assets/icons/pinterest.png' />
        </div>
        <div className='grid-text'>
          <p>
            Du suchst noch mehr Inspiration zum Reisen? Folge uns auf <strong>Pinterest</strong>!
          </p>
        </div>
        <div className='grid-button'>
          <a href='https://www.pinterest.com' target='_blank'>
            <button className='button--primary'>Zu Pinterest</button>
          </a>
        </div>
      </div>
    </Layout>
  );
}
