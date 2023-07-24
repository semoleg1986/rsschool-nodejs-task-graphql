import { Post, PrismaClient } from "@prisma/client";
import DataLoader from "dataloader";

export const postLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (keys: readonly string[]) => {
      const posts: Post[] = await prisma.post.findMany({
        where: {
          authorId: { in: keys as string[] },
        },
      });
      
      const mapAutorPosts = new Map<string, Post[]>();
  
      posts.forEach((post) => {
        const authorPosts = mapAutorPosts.get(post.authorId) || [];
        authorPosts.push(post);
        mapAutorPosts.set(post.authorId, authorPosts);
      });
  
      const sortedPosts = keys.map((id) => mapAutorPosts.get(id));
      return sortedPosts;
    });
  };
  