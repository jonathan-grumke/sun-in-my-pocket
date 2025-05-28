'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { TravelDiaryConnectionQuery, TravelDiaryConnectionQueryVariables } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { ArrowRight, UserRound } from 'lucide-react';
import { Card } from '@/components/ui/card';
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
    let formattedDate = '';
    if (!isNaN(date.getTime())) {
      formattedDate = format(date, 'MMM dd, yyyy');
    }

    return {
      id: post.id,
      published: formattedDate,
      title: post.title,
      url: `/travel-diary/${post.slug}`,
      description: post.description,
      heroImg: post.heroImg,
      author: post.author,
    };
  });

  return (
    <ErrorBoundary>
      <Section>
        <div className=''>
          <div className=''>
            <h1>Reisetagebuch</h1>
            <p>
              Erlebe die Reise unseres Lebens hautnah mit uns. Tauche tief in unsere Gedankenwelt ein, verfolge unsere Route auf Schritt und Tritt und lass dich
              in die Weiten der Welt mitnehmen.
            </p>
            <p>
              Wir lassen Deutschland hinter uns und bereisen 1 Jahr lang mit dem Rucksack die Welt. Du erfährst hier in wöchentlichen Updates nicht nur von
              unseren aktuellen Standorten, sondern auch von unseren alltäglichen Abenteuern und wie wir uns dabei fühlen.
            </p>
          </div>

          <div className=''>
            {posts.map((post) => (
              <Card key={post.id} className='order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2'>
                <div className='grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12'>
                  <div className='sm:col-span-5'>
                    <h3 className='text-xl font-semibold md:text-2xl lg:text-3xl'>
                      <Link href={post.url} className='hover:underline'>
                        {post.title}
                      </Link>
                    </h3>
                    <div className='mt-4 text-muted-foreground md:mt-5'>
                      <TinaMarkdown content={post.description} />
                    </div>
                    <div className='mt-6 flex items-center space-x-4 text-sm md:mt-8'>
                      <span className=''>{post.author}</span>
                      <span className=''>•</span>
                      <span className=''>{post.published}</span>
                    </div>
                    <div className='mt-6 flex items-center space-x-2 md:mt-8'>
                      <Link href={post.url} className='inline-flex items-center font-semibold hover:underline md:text-base'>
                        <span>Read more</span>
                        <ArrowRight className='ml-2 size-4 transition-transform' />
                      </Link>
                    </div>
                  </div>
                  {post.heroImg && (
                    <div className='order-first sm:order-last sm:col-span-5'>
                      <Link href={post.url} className='block'>
                        <div className='aspect-[16/9] overflow-clip rounded-lg border border-border'>
                          <Image
                            width={533}
                            height={300}
                            src={post.heroImg}
                            alt={post.title}
                            className='h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70'
                          />
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </ErrorBoundary>
  );
}
