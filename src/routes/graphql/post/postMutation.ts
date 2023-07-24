import { PostType } from "./postType.js";
import { ChangePostInput, CreatePostInput } from "./postInput.js";
import { Context } from "../types/context.js";
import { UUIDType } from "../types/uuid.js";
import { GraphQLNonNull, GraphQLObjectType } from "graphql";

export interface ICreatePost {
    dto: {
      title: string;
      content: string;
      authorId: string;
    };
  }

export interface IChangePost {
    id: string,
    dto: {
      title: string;
      content: string;
    };
  }

export const PostMutation = {
    createPost: {
        type: PostType as GraphQLObjectType,
        args: {
            dto: {type: new GraphQLNonNull(CreatePostInput)},
        },
        resolve: async (__: unknown, {dto}: ICreatePost, {prisma}: Context) =>
           await prisma.post.create({ data: dto})
    },
    changePost: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(UUIDType) }, dto: { type:ChangePostInput} },
      resolve: async (__: unknown, {id, dto}:IChangePost, { prisma }: Context) =>
         await prisma.post.update({ where: { id }, data: dto }),
    },
    deletePost: {
      type: UUIDType,
      args: {id: {type: UUIDType }},
      resolve: async (__: unknown, {id}:{id:string},{ prisma }: Context) =>{
        await prisma.post.delete({ where: { id } })
        return id;
      },
    }
};