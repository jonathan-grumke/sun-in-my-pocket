import { MetadataRoute } from "next";
import client from "@/tina/__generated__/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: "https://suninmypocket.com", // Replace with your homepage
      lastModified: new Date(),
    },
  ];

  let posts = await client.queries.travelDiaryConnection({
    sort: "date",
    last: 1,
  });
  const allPosts = posts;

  if (!allPosts.data.travelDiaryConnection.edges) {
    return [];
  }

  while (posts.data?.travelDiaryConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.travelDiaryConnection({
      sort: "date",
      before: posts.data.travelDiaryConnection.pageInfo.endCursor,
    });

    if (!posts.data.travelDiaryConnection.edges) {
      break;
    }

    allPosts.data.travelDiaryConnection.edges.push(
      ...posts.data.travelDiaryConnection.edges.reverse()
    );
  }

  allPosts.data.travelDiaryConnection.edges.forEach((postData) => {
    const post = postData!.node!;
    links.push({
      url: `https://suninmypocket.com/travel-diary/${post!._sys.breadcrumbs.join(
        "/"
      )}`,
      lastModified: new Date(post.date!),
    });
  });

  return links;
}
