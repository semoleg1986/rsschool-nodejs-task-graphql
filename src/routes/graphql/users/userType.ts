
import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../profile/profileType.js';
import { User } from '@prisma/client';
import { Context } from '../types/context.js';
import { PostType } from '../post/postType.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async ({ id }: User, __: unknown, { loaders }: Context) =>
         await loaders.profileDataLoader.load(id)
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async ({ id }: User, __: unknown, { loaders }: Context) => 
        await loaders.postDataLoader.load(id),
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, __: unknown, { loaders }: Context) =>
      await loaders.userSubDataLoader.load(id),
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async ({ id }: User, __: unknown, { loaders }: Context) =>
      await loaders.subUserDataLoader.load(id),
    },
  }),
});