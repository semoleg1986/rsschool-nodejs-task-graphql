import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "./userType.js";
import { CreateUserInput } from "./InputUser.js";
import { Context } from "../types/context.js";
import { UUIDType } from '../types/uuid.js';

export interface ICreateUserInput {
    user: {
      name: string;
      balance: number;
    };
  }


export const UserMutation = {
    createUser: {
        type: UserType as GraphQLObjectType,
        args: {
            user: {type: new GraphQLNonNull(CreateUserInput)},
        },
        resolve: async (__: unknown, {user}: ICreateUserInput, {prisma}: Context) => await prisma.user.create({data: user})
    },

    updateUser: {
        type: UserType as GraphQLObjectType,
        args: {
            id: {type: new GraphQLNonNull(UUIDType)},
            user: {type: new GraphQLNonNull(CreateUserInput)},
        },
        resolve: async (__: unknown, {id, user}:{ id: string, user: ICreateUserInput }, { prisma }: Context) => 
            await prisma.user.update({where: {id}, data: user})
    },

    deleteUser:  {
        type: UserType as GraphQLObjectType,
        args:{
            id: {type: new GraphQLNonNull(UUIDType)},
        },
        resolve: async (__: unknown, { id }: { id: string }, { prisma }: Context) => 
            await prisma.user.delete({where: {id} })
    }
};