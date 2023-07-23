import { GraphQLNonNull, GraphQLObjectType } from "graphql";
import { CreateProfileInput } from "./profileInput.js";
import { Context } from "../types/context.js";
import { ProfileType } from "./profileType.js";
import { UUIDType } from "../types/uuid.js";

export interface ICreateProfile {
    profile: {
      isMale: boolean;
      yearOfBirth: number;
      memberTypeId: string;
      userId: string;
    };
  }

export const ProfileMutation = {
    createProfile: {
        type: ProfileType as GraphQLObjectType,
        args: {profile: { type: new GraphQLNonNull(CreateProfileInput)}},
        resolve: async (__: unknown, {profile}: ICreateProfile, {prisma}: Context )=>
            await prisma.profile.create({data: profile})
    },

}