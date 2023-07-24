import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { ChangeProfileInput, CreateProfileInput } from "./profileInput.js";
import { Context } from "../types/context.js";
import { ProfileType } from "./profileType.js";
import { UUIDType } from "../types/uuid.js";

export interface ICreateProfile {
    dto: {
      isMale: boolean;
      yearOfBirth: number;
      memberTypeId: string;
      userId: string;
    };
  }

export interface IChangeProfile {
    id: string,
    dto: {
        isMale: boolean;
        yearOfBirth: number;
        memberTypeId: string;
    };
}

export const ProfileMutation = {
    createProfile: {
        type: ProfileType as GraphQLObjectType,
        args: {
            dto: { type: new GraphQLNonNull(CreateProfileInput)}
        },
        resolve: async (__: unknown, {dto}: ICreateProfile, {prisma}: Context )=>
            await prisma.profile.create({data: dto})
    },
    changeProfile: {
        type: ProfileType as GraphQLObjectType,
        args: {
            id: { type: new GraphQLNonNull(UUIDType)},
            dto: {type: ChangeProfileInput}
        },
        resolve: async (__: unknown, {id, dto}:IChangeProfile, {prisma}: Context) =>
            await prisma.profile.update({ where: { id }, data: dto }),
    },
    deleteProfile: {
        type: UUIDType,
        args: {id: {type:UUIDType }},
        resolve: async (__: unknown, {id}:{id:string},{ prisma }: Context) =>{

            await prisma.profile.delete({ where: { id } });
            return id;

        },
      }

}