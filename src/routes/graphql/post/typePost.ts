import { GraphQLObjectType, GraphQLString } from 'graphql';
import { Context } from '../types/context.js';
import { Post } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../users/typeUser.js';

export const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'Post data',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType as GraphQLObjectType,
      resolve: async (source: Post, __: unknown, { prisma }: Context) => {
        const { authorId } = source;
        const author = prisma.post.findUnique({ where: { id: authorId } });
        return author;
      },
    },
  }),
});