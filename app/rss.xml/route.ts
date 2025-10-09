import RSS from "rss";
import { getAllDiaryPosts } from "@/lib/posts";

const feed = new RSS({
  title: "Sun In My Pocket",
  description: "Folge uns auf unseren Reisen rund um die Welt.",
  site_url: "https://suninmypocket.com",
  feed_url: `https://suninmypocket.com/rss.xml`,
  copyright: `${new Date().getFullYear()} Sun In My Pocket`,
  language: "de-DE",
  pubDate: new Date(),
});

// const posts = await client.queries.travelDiaryConnection({});
const diaryPosts = await getAllDiaryPosts();

diaryPosts.data.travelDiaryConnection.edges!.forEach((postData) => {
  const post = postData!.node!;
  feed.item({
    title: post.title,
    guid: `https://suninmypocket.com/travel-diary/${post!._sys.breadcrumbs.join(
      "/"
    )}`,
    url: `https://suninmypocket.com/travel-diary/${post!._sys.breadcrumbs.join(
      "/"
    )}`,
    date: post.date,
    description: post.description,
    author: post.author,
  });
});

export async function GET() {
  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
