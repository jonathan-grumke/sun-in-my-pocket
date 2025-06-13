import React from 'react';
import { Metadata } from 'next';
import { Inter as FontSans, Lato, Nunito } from 'next/font/google';
import { cn } from '@/lib/utils';
import { VideoDialogProvider } from '@/components/ui/VideoDialogContext';
import VideoDialog from '@/components/ui/VideoDialog';

// import '@/styles.css';
// import { TailwindIndicator } from '@/components/ui/breakpoint-indicator';

import '@/styles/global.css';
import Head from 'next/head';

// const fontSans = FontSans({
//   subsets: ['latin'],
//   variable: '--font-sans',
// });

// const nunito = Nunito({
//   subsets: ['latin'],
//   variable: '--font-nunito',
// });

// const lato = Lato({
//   subsets: ['latin'],
//   variable: '--font-lato',
//   weight: '400',
// });

export const metadata: Metadata = {
  title: 'Sun in my Pocket',
  description:
    'Lies über unsere Abenteuer auf der ganzen Welt und finde Reiserouten, Städtetrips, Tipps und Empfehlungen für Reiseziele rund um den Globus. Reise mit uns!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='de'>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta charSet='UTF-8' />
      </Head>
      <body>
        {/* <VideoDialogProvider> */}
        {children}
        {/* <VideoDialog />
        </VideoDialogProvider> */}
        {/* <TailwindIndicator /> */}
      </body>
    </html>
  );
}
