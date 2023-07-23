import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../types/context.js';
import { Profile } from '@prisma/client';
import { ProfileType } from './profileType.js';

export const getProfile = {
  profile: {
    type: ProfileType as GraphQLObjectType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType)},
    },
    resolve: async (_: unknown, { id }: Profile, { prisma }: Context) => {
      const profile = await prisma.profile.findUnique({ where: { id } });
      return profile;
    },
  },

  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (_: unknown, __: unknown, { prisma }: Context) => {
      const profiles = await prisma.profile.findMany();
      return profiles;
    },
  },
};