'use client';
import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { TravelDiaryConnectionQuery, TravelDiaryConnectionQueryVariables, TravelDiaryQuery } from '@/tina/__generated__/types';
import { useLayout } from '@/components/layout/layout-context';
import { Section } from '@/components/layout/section';
import { components } from '@/components/mdx-components';
import ErrorBoundary from '@/components/error-boundary';
import Head from 'next/head';
import { Metadata } from 'next';
import client from '@/tina/__generated__/client';
import { DiaryPosts } from '@/components/diary-post-list';
import { title } from 'process';

interface ClientTravelDiaryProps {
  data: TravelDiaryQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function TravelDiaryClientPage(props: ClientTravelDiaryProps) {
  // const { theme } = useLayout();
  const { data } = useTina({ ...props });
  const post = data.travelDiary;

  const date = new Date(post.date!);
  const formattedDate = date.toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <ErrorBoundary>
        <Section>
          <div className='title'>
            <h1 data-tina-field={tinaField(post, 'title')}>{post.title}</h1>
            <div className='' style={{ color: 'rgb(var(--gray))' }}>
              <p data-tina-field={tinaField(post, 'author')} style={{ color: 'rgb(var(--gray))' }}>
                {post.author}
              </p>
              <p data-tina-field={tinaField(post, 'date')}>{formattedDate}</p>
            </div>
          </div>
          <div data-tina-field={tinaField(post, 'heroImg')} className='hero-image--container'>
            <Image src={post.heroImg} alt='' className={'hero-image'} width={1020} height={510} />
          </div>
          <div data-tina-field={tinaField(post, '_body')} className='prose'>
            <p>
              Erlebe in unserem <strong>Reisetagebuch</strong> die Reise unseres Lebens hautnah mit. Tauche tief in unsere Gedankenwelt ein,{' '}
              <strong>verfolge unsere Reiseroute</strong> auf Schritt und Tritt und lass dich in die Weiten der Welt mitnehmen.
            </p>
            <p>
              Wir lassen Deutschland hinter uns und bereisen
              <strong>1 Jahr lang</strong> mit dem Rucksack die Welt. Du erfährst hier in wöchentlichen Updates nicht nur von unserem aktuellen Standort,
              sondern auch von unseren alltäglichen Erlebnissen und wie wir uns dabei fühlen.
            </p>
            <TinaMarkdown
              content={post._body}
              components={{
                ...components,
              }}
            />
          </div>
        </Section>
      </ErrorBoundary>
    </>
  );
}
