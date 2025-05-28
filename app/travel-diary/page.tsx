import Layout from '@/components/layout/layout';
import client from '@/tina/__generated__/client';
import TravelDiaryClientPage from './client-page';

export const revalidate = 300;

export default async function TravelDiaryPage() {
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

  return (
    <Layout rawPageData={allPosts.data}>
      <TravelDiaryClientPage {...allPosts} />
    </Layout>
  );
}
