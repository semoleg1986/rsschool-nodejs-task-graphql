import { GraphQLBoolean, GraphQLInt, GraphQLObjectType } from 'graphql';
import { Profile } from '@prisma/client';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../users/userType.js';
import { Context } from '../types/context.js';
import { MemberType, MemberTypeIdEnum } from '../memberType/memberType.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  description: 'Profile data',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdEnum },
    user: {
      type: UserType as GraphQLObjectType,
      resolve: async (source: Profile, __: unknown, { prisma }: Context) => {
        const { userId } = source;

        return prisma.user.findUnique({ where: { id: userId } });
      },
    },
    memberType: {
      type: MemberType as GraphQLObjectType,
      resolve: async (source: Profile, __: unknown, { prisma }: Context) => {
        const { memberTypeId } = source;

        return prisma.memberType.findUnique({ where: { id: memberTypeId } });
      },
    },
  }),
});