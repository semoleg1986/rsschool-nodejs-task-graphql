import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "./userType.js";
import { CreateUserInput } from "./userInput.js";
import { Context } from "../types/context.js";
import { UUIDType } from '../types/uuid.js';

export interface ICreateUser {
    dto: {
      name: string;
      balance: number;
    };
  }


export const UserMutation = {
    createUser: {
        type: UserType as GraphQLObjectType,
        args: {
            dto: {type: new GraphQLNonNull(CreateUserInput)},
        },
        resolve: async (__: unknown, {dto}: ICreateUser, {prisma}: Context) => await prisma.user.create({data: dto})
    },

    updateUser: {
        type: UserType as GraphQLObjectType,
        args: {
            id: {type: new GraphQLNonNull(UUIDType)},
            dto: {type: new GraphQLNonNull(CreateUserInput)},
        },
        resolve: async (__: unknown, {id, dto}:{ id: string, dto: ICreateUser }, { prisma }: Context) => 
            await prisma.user.update({where: {id}, data: dto})
    },

    deleteUser:  {
        type: UserType as GraphQLObjectType,
        args:{
            id: {type: new GraphQLNonNull(UUIDType)},
        },
        resolve: async (__: unknown, { id }: { id: string }, { prisma }: Context) => 
            await prisma.user.delete({where: {id} })
    },
    subscribeTo: {
        type: UserType as GraphQLObjectType,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (
          __: unknown,
          args: { userId: string; authorId: string },
          { prisma }: Context,
        ) => {
          const { userId, authorId } = args;
          return await prisma.user.update({
            where: { id: userId },
            data: { userSubscribedTo: { create: { authorId } } },
          });
        },
      },
    unsubscribeFrom: {
        type: UUIDType,
        args: {
          userId: { type: new GraphQLNonNull(UUIDType) },
          authorId: { type: new GraphQLNonNull(UUIDType) },
        },
        resolve: async (
          __: unknown,
          args: { userId: string; authorId: string },
          { prisma }: Context,
        ) => {
          const { userId, authorId } = args;
          await prisma.subscribersOnAuthors.delete({
            where: {
              subscriberId_authorId: {
                subscriberId: userId,
                authorId,
              },
            },
          });
          return userId;
        },
    }
};