import Layout from '@/components/layout/layout';
import TravelDiaryClientPage from './client-page';
import { getAllDiaryPosts } from '@/lib/posts';

export const revalidate = 300;

export default async function TravelDiaryPage() {
  const allPosts = await getAllDiaryPosts();

  return (
    <Layout rawPageData={allPosts.data}>
      <TravelDiaryClientPage {...allPosts} />
    </Layout>
  );
}
