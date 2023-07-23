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
      resolve: async ({ authorId }: Post, __: unknown, { prisma }: Context) =>
        await prisma.user.findUnique({ where: { id: authorId } }),
    },
  }),
});