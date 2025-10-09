import { MetadataRoute } from "next";
import { getAllDiaryPosts } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const links = [
    {
      url: "https://suninmypocket.com", // Replace with your homepage
      lastModified: new Date(),
    },
  ];

  const diaryPosts = await getAllDiaryPosts();

  diaryPosts.data.travelDiaryConnection.edges!.forEach((postData) => {
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
