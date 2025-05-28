'use client';
import React from 'react';
import Image from 'next/image';
import { format } from 'date-fns';
import { tinaField, useTina } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { TravelDiaryQuery } from '@/tina/__generated__/types';
import { useLayout } from '@/components/layout/layout-context';
import { Section } from '@/components/layout/section';
import { components } from '@/components/mdx-components';
import ErrorBoundary from '@/components/error-boundary';

interface ClientTravelDiaryProps {
  data: TravelDiaryQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function TravelDiaryClientPage(props: ClientTravelDiaryProps) {
  const { theme } = useLayout();
  const { data } = useTina({ ...props });
  const post = data.travelDiary;

  const date = new Date(post.date!);
  let formattedDate = '';
  if (!isNaN(date.getTime())) {
    formattedDate = format(date, 'MMM dd, yyyy');
  }

  return (
    <ErrorBoundary>
      <Section>
        <h1 data-tina-field={tinaField(post, 'title')}>{post.title}</h1>
        <div className=''>
          <p data-tina-field={tinaField(post, 'author')} style={{ color: 'rgb(var(--gray))' }}>
            {post.author}
          </p>
          <span className=''>—</span>
          <p data-tina-field={tinaField(post, 'date')}>{formattedDate}</p>
        </div>
        <div data-tina-field={tinaField(post, 'heroImg')} className='hero-image--container'>
          <Image src={post.heroImg} alt='' className={'hero-image'} width={1020} height={510} />
        </div>
        <div data-tina-field={tinaField(post, '_body')} className='prose'>
          <TinaMarkdown
            content={post._body}
            components={{
              ...components,
            }}
          />
        </div>
      </Section>
    </ErrorBoundary>
  );
}
