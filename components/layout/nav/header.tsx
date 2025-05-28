'use client';

import React from 'react';
import Link from 'next/link';
import { useLayout } from '../layout-context';

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;

  const [menuState, setMenuState] = React.useState(false);
  return (
    <header>
      <nav>
        <a href='/' aria-label='Zur Startseite' className='home-link'>
          <img src='/assets/icons/sun-in-my-pocket.svg' alt='' />
        </a>
        <div className='internal-links header--links'>
          {header.nav!.map((item, index) => (
            // <li key={index}>
            <Link href={item!.href!} className='' key={index}>
              <span>{item!.label}</span>
            </Link>
            // </li>
          ))}
        </div>
      </nav>
    </header>
  );
};
