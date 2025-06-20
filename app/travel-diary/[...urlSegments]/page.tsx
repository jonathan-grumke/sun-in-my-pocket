import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TravelDiaryClientPage from './client-page';
import { Metadata } from 'next';
import { useTina } from 'tinacms/dist/react';
import { TravelDiaryQuery } from '@/tina/__generated__/types';
import Head from 'next/head';
import Image from 'next/image';

export const revalidate = 300;

export default async function TravelDiaryPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  let posts = await client.queries.travelDiaryConnection({
    sort: 'date',
    last: 1,
  });
  const allPosts = posts;

  if (!allPosts.data.travelDiaryConnection.edges) {
    return [];
  }

  while (posts.data?.travelDiaryConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.travelDiaryConnection({
      sort: 'date',
      before: posts.data.travelDiaryConnection.pageInfo.endCursor,
    });

    if (!posts.data.travelDiaryConnection.edges) {
      break;
    }

    allPosts.data.travelDiaryConnection.edges.push(...posts.data.travelDiaryConnection.edges.reverse());
  }

  const postsData = allPosts.data?.travelDiaryConnection.edges!.map((postData) => {
    const post = postData!.node!;
    const date = new Date(post.date);
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

  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  const data = await client.queries.travelDiary({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <TravelDiaryClientPage {...data} />
      <h2>Du hast unsere letzten Weekly Updates noch nicht gelesen?</h2>
      <ul className='posts-list'>
        {postsData.slice(0, 7).map((post) => (
          <li key={post.id}>
            <a href={post.url}>
              <Image src={post.heroImg} className={'tile-image'} width={720} height={360} alt='' />
              <p className='posts-list--title'>{post.title}</p>
              <p className='posts-list--date'>{post.published}</p>
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function generateStaticParams() {
  let posts = await client.queries.travelDiaryConnection();
  const allPosts = posts;

  if (!allPosts.data.travelDiaryConnection.edges) {
    return [];
  }

  while (posts.data?.travelDiaryConnection.pageInfo.hasNextPage) {
    posts = await client.queries.travelDiaryConnection({
      after: posts.data.travelDiaryConnection.pageInfo.endCursor,
    });

    if (!posts.data.travelDiaryConnection.edges) {
      break;
    }

    allPosts.data.travelDiaryConnection.edges.push(...posts.data.travelDiaryConnection.edges);
  }

  const params =
    allPosts.data?.travelDiaryConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
