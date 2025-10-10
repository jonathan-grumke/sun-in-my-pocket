import client from "@/tina/__generated__/client";

export async function getAllDiaryPosts() {
  let posts = await client.queries.travelDiaryConnection({
    sort: "date",
    last: 1,
  });
  const allPosts = posts;

  //   if (!allPosts.data.travelDiaryConnection.edges) {
  //     return [];
  //   }

  while (posts.data?.travelDiaryConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.travelDiaryConnection({
      sort: "date",
      before: posts.data.travelDiaryConnection.pageInfo.endCursor,
      filter: { published: { eq: "Ja" } },
    });

    if (!posts.data.travelDiaryConnection.edges) {
      break;
    }

    allPosts.data.travelDiaryConnection.edges!.push(
      ...posts.data.travelDiaryConnection.edges.reverse()
    );
  }

  return allPosts;
}

export async function getAllGuidePosts() {
  let posts = await client.queries.travelGuideConnection({
    sort: "date",
    last: 1,
  });
  const allPosts = posts;

  //   if (!allPosts.data.travelDiaryConnection.edges) {
  //     return [];
  //   }

  while (posts.data?.travelGuideConnection.pageInfo.hasPreviousPage) {
    posts = await client.queries.travelGuideConnection({
      sort: "date",
      before: posts.data.travelGuideConnection.pageInfo.endCursor,
      filter: { published: { eq: "Ja" } },
    });

    if (!posts.data.travelGuideConnection.edges) {
      break;
    }

    allPosts.data.travelGuideConnection.edges!.push(
      ...posts.data.travelGuideConnection.edges.reverse()
    );
  }

  return allPosts;
}
