'use client';
import React from 'react';
import Image from 'next/image';
import { TravelDiaryConnectionQuery, TravelDiaryConnectionQueryVariables } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { Section } from '@/components/layout/section';

interface ClientTravelDiaryProps {
  data: TravelDiaryConnectionQuery;
  variables: TravelDiaryConnectionQueryVariables;
  query: string;
}

export default function TravelDiaryClientPage(props: ClientTravelDiaryProps) {
  const posts = props.data?.travelDiaryConnection.edges!.map((postData) => {
    const post = postData!.node!;
    const date = new Date(post.date!);
    const formattedDate = date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return {
      id: post.id,
      published: formattedDate,
      title: post.title,
      url: `/travel-diary/${post._sys.breadcrumbs.join('/')}`,
      description: post.description,
      heroImg: post.heroImg,
      author: post.author,
    };
  });

  return (
    <ErrorBoundary>
      <Section>
        <h1>Reisetagebuch</h1>
        <p>
          Erlebe die Reise unseres Lebens hautnah mit uns. Tauche tief in unsere Gedankenwelt ein, verfolge unsere Route auf Schritt und Tritt und lass dich in
          die Weiten der Welt mitnehmen.
        </p>
        <p className='space-after'>
          Wir lassen Deutschland hinter uns und bereisen 1 Jahr lang mit dem Rucksack die Welt. Du erfährst hier in wöchentlichen Updates nicht nur von unseren
          aktuellen Standorten, sondern auch von unseren alltäglichen Abenteuern und wie wir uns dabei fühlen.
        </p>

        <ul className='posts-list'>
          {posts.map((post) => (
            <li key={post.id}>
              <a href={post.url}>
                <Image src={post.heroImg} className={'tile-image'} width={720} height={360} alt='' />
                <p className='posts-list--title'>{post.title}</p>
                <p className='posts-list--date'>{post.published}</p>
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </ErrorBoundary>
  );
}
