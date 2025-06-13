import React from 'react';
import Image from 'next/image';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { ImageSolo } from '@/components/images/image-solo';

export const revalidate = 300;

export default async function Home() {
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
    <Layout>
      {/* <ErrorBoundary>
        <Section> */}
      <div className=''>
        <div className=''>
          <h1>Sun in my Pocket</h1>
          <p>
            Erlebe die Reise unseres Lebens hautnah mit uns. Tauche tief in unsere Gedankenwelt ein, verfolge unsere Route auf Schritt und Tritt und lass dich
            in die Weiten der Welt mitnehmen.
          </p>
          <p>
            Wir lassen Deutschland hinter uns und bereisen 1 Jahr lang mit dem Rucksack die Welt. Du erfährst hier in wöchentlichen Updates nicht nur von
            unseren aktuellen Standorten, sondern auch von unseren alltäglichen Abenteuern und wie wir uns dabei fühlen.
          </p>
        </div>
      </div>
      <ImageSolo image='/assets/portugal/madeira/surfen.jpg' />
      <h2>Reisetagebuch</h2>
      <p>
        Erlebe die Reise unseres Lebens hautnah mit uns. Tauche tief in unsere Gedankenwelt ein, verfolge unsere Route auf Schritt und Tritt und lass dich in
        die Weiten der Welt mitnehmen.
      </p>
      <p>
        Wir lassen Deutschland hinter uns und bereisen 1 Jahr lang mit dem Rucksack die Welt. Du erfährst hier in wöchentlichen Updates nicht nur von unseren
        aktuellen Standorten, sondern auch von unseren alltäglichen Abenteuern und wie wir uns dabei fühlen.
      </p>
      <a href='travel-diary'>
        <button className='button--primary space-after'>Zum Reisetagebuch</button>
      </a>
      <ImageSolo image='/assets/portugal/madeira/jona.jpg' />
      <h2>Reiseziele</h2>
      <p>
        Wir reisen liebend gern, und das nicht erst seit unserer Weltreise. Entdecke die schönsten Orte der Welt durch unsere Augen. Du findest hier
        Reiserouten, Städtetrips, die schönsten Sehenswürdigkeiten, Tipps und Empfehlungen rund um den Globus.
      </p>
      <a href='travel-guide'>
        <button className='button--primary space-after'>Zu unseren Reisezielen</button>
      </a>
      <ImageSolo image='/assets/portugal/madeira/east-end.jpg' />
      <h2>Folge uns auf Social Media</h2>
      <p>Du willst noch mehr von unserer Reise sehen? Dann folge uns auf Instagram!</p>
      <a href='https://www.instagram.com/_me_monique/' target='_blank'>
        <button className='button--primary space-after'>Zu unserem Instagram</button>
      </a>
      <h2>Hier findest du die neusten Updates unserer Weltreise!</h2>
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
      {/* </Section>
      </ErrorBoundary> */}
      {/* <HomeClientPage {...allPosts.data} /> */}
    </Layout>
  );
}
