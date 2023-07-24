import { GraphQLList, GraphQLObjectType, GraphQLResolveInfo } from 'graphql';
import { UserType } from './userType.js';
import { Context } from '../types/context.js';
import { UUIDType } from '../types/uuid.js';
import { User } from '@prisma/client';
import { ResolveTree, parseResolveInfo, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';

export const getUser = {
  user: {
    type: UserType as GraphQLObjectType,
    args: {
      id: { type: UUIDType },
    },
    resolve: async (_: unknown, { id }: User, { loaders }: Context) =>
      await loaders.userDataLoader.load(id),
  },

  users: {
    type: new GraphQLList(UserType),
    resolve: async (_: unknown, __: unknown, { prisma, loaders }: Context, info: GraphQLResolveInfo) => {
      const parsedInfo: ResolveTree = parseResolveInfo(info) as ResolveTree;

      const { fields } = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);
      
      const userSubscribedTo = 'userSubscribedTo' in fields;
      const subscribedToUser = 'subscribedToUser' in fields;
      
      const users = await prisma.user.findMany({
        include: { userSubscribedTo, subscribedToUser },
      });

      users.forEach((user) => {
        loaders.userDataLoader.prime(user.id, user);
      });

      return users;
    },
  },
};