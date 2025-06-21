import React from 'react';
import Layout from '@/components/layout/layout';

export const revalidate = 300;

export default async function TravelGuides() {
  return (
    <Layout>
      <h1>Du suchst Inspiration für deine nächste Reise?</h1>
      <p>Hier findest du Beiträge mit Erfahrungsberichten, Empfehlungen und Inspirationen für deinen nächsten Urlaub!</p>
    </Layout>
  );
}
