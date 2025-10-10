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
      filter: { published: { eq: true } },
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
