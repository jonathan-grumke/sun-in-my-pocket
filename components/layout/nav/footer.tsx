'use client';
import React from 'react';
import { SocialLinks } from '@/components/social-links';

export const Footer = () => {
  const today = new Date();

  return (
    <footer>
      <div className='footer-navigation'>
        <a href='/contact'> Kontakt </a>
        <a href='/imprint'> Impressum </a>|<a href='/'>Home</a>
        <a href='/travel-diary'>Reisetagebuch</a>
        <a href='/travel-guide'>Reiseziele</a>
        <a href='/about'>Über uns</a>
      </div>
      &copy; {today.getFullYear()} Sun in my pocket. All rights reserved.
      <SocialLinks />
    </footer>
  );
};
