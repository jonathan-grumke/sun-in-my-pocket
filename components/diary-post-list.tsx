import React from 'react';
import Image from 'next/image';
import client from '@/tina/__generated__/client';

export const DiaryPosts = async ({ title, numberOfPosts }) => {
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
    <>
      <h2>{title}</h2>
      <ul className='posts-list'>
        {postsData.slice(0, numberOfPosts).map((post) => (
          <li key={post.id}>
            <a href={post.url}>
              <Image src={post.heroImg} className={'tile-image'} width={720} height={360} alt='' />
              <p className='posts-list--title'>{post.title}</p>
              <p className='posts-list--date'>{post.published}</p>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};
