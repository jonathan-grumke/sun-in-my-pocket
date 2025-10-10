'use client';
import React from 'react';
import Image from 'next/image';
import { TravelGuideConnectionQuery, TravelGuideConnectionQueryVariables } from '@/tina/__generated__/types';
import ErrorBoundary from '@/components/error-boundary';
import { Section } from '@/components/layout/section';

interface ClientTravelGuideProps {
    data: TravelGuideConnectionQuery;
    variables: TravelGuideConnectionQueryVariables;
    query: string;
}

export default function TravelGuidesClientPage(props: ClientTravelGuideProps) {
    const posts = props.data?.travelGuideConnection.edges!.map((postData) => {
        const post = postData!.node!;
        const date = new Date(post.date!);
        const formattedDate = date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });

        return {
            id: post.id,
            datePublished: formattedDate,
            title: post.title,
            url: `/travel-guides/${post._sys.breadcrumbs.join('/')}`,
            description: post.description,
            heroImg: post.heroImg,
        };
    });

    return (
        <ErrorBoundary>
            <Section>
                <h1 style={{ hyphens: 'auto' }}>Du suchst Inspiration für deine nächste Reise?</h1>
                <p>
                    Hier findest du Beiträge mit Erfahrungsberichten, Empfehlungen und Inspirationen für deinen nächsten Urlaub!
                </p>
                <ul className='posts-list'>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <a href={post.url}>
                                <Image src={post.heroImg} className={'tile-image'} width={720} height={360} alt='' />
                                <p className='posts-list--title'>{post.title}</p>
                                <p className='posts-list--date'>{post.datePublished}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </Section>
        </ErrorBoundary>
    );
}