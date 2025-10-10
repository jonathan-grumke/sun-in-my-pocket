import React from 'react';
import Layout from '@/components/layout/layout';
import { getAllGuidePosts } from '@/lib/posts';
import TravelGuidesClientPage from './client-page';

export const revalidate = 300;

export default async function TravelGuides() {
  const allPosts = await getAllGuidePosts();

  return (
    <Layout rawPageData={allPosts.data}>
      <TravelGuidesClientPage {...allPosts} />
    </Layout>
  );
}
