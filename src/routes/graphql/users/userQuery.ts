import { GraphQLList, GraphQLObjectType } from 'graphql';
import { UserType } from './userType.js';
import { Context } from '../types/context.js';
import { UUIDType } from '../types/uuid.js';
import { User } from '@prisma/client';

export const getUser = {
  user: {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: User, { prisma }: Context) =>
      await prisma.user.findUnique({ where: { id } }),
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
      const users = await prisma.user.findMany();
      return users;
    },
  },
};