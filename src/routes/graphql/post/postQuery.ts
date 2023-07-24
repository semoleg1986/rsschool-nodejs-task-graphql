import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { PostType } from './postType.js';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../types/context.js';

export const getPost = {
  post: {
    type: PostType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (__: unknown, { id }: {id:string}, { prisma }: Context) => 
    await prisma.post.findUnique({ where: { id } }),
  },

  posts: {
    type: new GraphQLList(PostType),
    resolve: async (__: unknown, _: unknown, { prisma }: Context) => {
      const posts = await prisma.post.findMany();
      return posts;
    },
  },
};