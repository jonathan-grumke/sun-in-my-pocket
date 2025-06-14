import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TravelDiaryClientPage from './client-page';
import { Metadata } from 'next';
import { useTina } from 'tinacms/dist/react';
import { TravelDiaryQuery } from '@/tina/__generated__/types';
import Head from 'next/head';

export const revalidate = 300;

export default async function TravelDiaryPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  const data = await client.queries.travelDiary({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <TravelDiaryClientPage {...data} />
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
