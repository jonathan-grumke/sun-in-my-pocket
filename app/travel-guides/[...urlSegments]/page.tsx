import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import TravelGuideClientPage from './client-page';
import Image from 'next/image';
import { getAllGuidePosts } from '@/lib/posts';

export const revalidate = 300;

export default async function TravelGuidePage({
    params,
}: {
    params: Promise<{ urlSegments: string[] }>;
}) {
    const allPosts = await getAllGuidePosts();

    const postsData = allPosts.data?.travelGuideConnection.edges!.map((postData) => {
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

    const resolvedParams = await params;
    const filepath = resolvedParams.urlSegments.join('/');
    const data = await client.queries.travelGuide({
        relativePath: `${filepath}.mdx`,
    });

    return (
        <Layout rawPageData={data}>
            <TravelGuideClientPage {...data} />
            <h2>Du suchst noch mehr Tipps und Inspiration zum Reisen?</h2>
            <ul className='posts-list'>
                {postsData.slice(0, 7).map((post) => (
                    <li key={post.id}>
                        <a href={post.url}>
                            <Image src={post.heroImg} className={'tile-image'} width={720} height={360} alt='' />
                            <p className='posts-list--title'>{post.title}</p>
                            <p className='posts-list--date'>{post.datePublished}</p>
                        </a>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

export async function generateStaticParams() {
    let posts = await client.queries.travelGuideConnection();
    const allPosts = posts;

    if (!allPosts.data.travelGuideConnection.edges) {
        return [];
    }

    while (posts.data?.travelGuideConnection.pageInfo.hasNextPage) {
        posts = await client.queries.travelGuideConnection({
            after: posts.data.travelGuideConnection.pageInfo.endCursor,
        });

        if (!posts.data.travelGuideConnection.edges) {
            break;
        }

        allPosts.data.travelGuideConnection.edges.push(...posts.data.travelGuideConnection.edges);
    }

    const params =
        allPosts.data?.travelGuideConnection.edges.map((edge) => ({
            urlSegments: edge?.node?._sys.breadcrumbs,
        })) || [];

    return params;
}
