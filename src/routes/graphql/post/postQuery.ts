import { GraphQLList, GraphQLObjectType } from 'graphql';
import { PostType } from './typePost.js';
import { UUIDType } from '../types/uuid.js';
import { Post } from '@prisma/client';
import { Context } from '../types/context.js';

export const getPostQuery = {
  post: {
    type: PostType as GraphQLObjectType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (__: unknown, args: Post, { prisma }: Context) => {
      const { id } = args;
      const post = await prisma.post.findUnique({ where: { id } });
      return post;
    },
  },

  posts: {
    type: new GraphQLList(PostType),
    resolve: async (__: unknown, _: unknown, { prisma }: Context) => {
      const posts = await prisma.post.findMany();
      return posts;
    },
  },
};