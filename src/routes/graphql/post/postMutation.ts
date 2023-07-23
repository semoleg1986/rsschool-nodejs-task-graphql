import { Post } from '@prisma/client';
import { PostType } from "./typePost.js";
import { ChangePostInput, CreatePostInput } from "./InputPost.js";
import { Context } from "../types/context.js";
import { UUIDType } from "../types/uuid.js";

export interface ICreatePost {
    post: {
      title: string;
      content: string;
      authorId: string;
    };
  }

export interface IChangePost {
    id: string,
    post: {
      title: string;
      content: string;
    };
  }

export const PostMutation = {
    createPost: {
        type: PostType,
        args: {
            post: {type: CreatePostInput},
        },
        resolve: async (__: unknown, {post}: ICreatePost, {prisma}: Context) =>{
            await prisma.post.create({ data: post})},
    },
    changePost: {
      type: PostType,
      args: { id: { type: UUIDType}, post: { type: ChangePostInput } },
      resolve: async (__: unknown, {id, post}:IChangePost, { prisma }: Context) =>{
        await prisma.post.update({ where: { id }, data: post })},
    },
    deletePost: {
      type: PostType,
      args: {id: {type: UUIDType}},
      resolve: async (__: unknown, {id}:Pick<Post, 'id'>,{ prisma }: Context) =>{
        await prisma.post.delete({ where: { id } })},
    }
};