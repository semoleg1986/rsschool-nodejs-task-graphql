import { User } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { UserType } from "./typeUser.js";
import { CreateUserInput } from "./InputUser.js";
import { Context } from "../types/context.js";

export interface ICreateUserInput {
    user: {
      name: string;
      balance: number;
    };
  }

export const UserMutation = {
    createUser: {
        type: UserType as GraphQLObjectType,
        args: { user: {type: new GraphQLNonNull(CreateUserInput)}},
        resolve: async (__: unknown, {user}: ICreateUserInput, {prisma}: Context) => await prisma.user.create({data: user})
    }
};