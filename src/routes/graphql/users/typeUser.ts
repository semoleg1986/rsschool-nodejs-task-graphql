
import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../profile/typeProfile.js';
import { User } from '@prisma/client';
import { Context, UserSub } from '../types/context.js';
import { PostType } from '../post/typePost.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType as GraphQLObjectType,
      resolve: async (source: User, __: unknown, { prisma }: Context) => {
        const { id } = source;
        const profile = await prisma.profile.findUnique({ where: { userId: id } });
        return profile;
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async (source: User, __: unknown, { prisma }: Context) => {
        const { id } = source;

        const posts = await prisma.post.findMany({ where: { authorId: id } });
        return posts;
      },
    },

    userSubscribedTo: {
      type: new GraphQLList(UserType),
      async resolve(source: UserSub, _: unknown, { prisma, dataUsers }: Context) {
        const { id } = source;

        if (Array.isArray(dataUsers) && dataUsers.length > 0) {
          const user = dataUsers.find((user) => user.id === id);
          return user?.userSubscribedTo || null;
        }

        const userSubscribedTo = await prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: {
                subscriberId: id,
              },
            },
          },
        });

        return userSubscribedTo;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      async resolve(source: UserSub, _: unknown, { prisma, dataUsers }: Context) {
        const { id } = source;

        if (Array.isArray(dataUsers) && dataUsers.length > 0) {
          const user = dataUsers.find((user) => user.id === id);
          return user?.subscribedToUser || null;
        }

        const subscribedToUser = await prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: {
                authorId: id,
              },
            },
          },
        });

        return subscribedToUser;
      },
    },
  }),
});