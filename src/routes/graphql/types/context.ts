import { PrismaClient } from '@prisma/client';
import { MemberType, Post, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

interface IDataLoaders {
  postDataLoader: DataLoader<string, Post[] | undefined>;
  memberDataLoader: DataLoader<string, MemberType | undefined>;
  profileDataLoader: DataLoader<string, Profile | undefined>;
  userDataLoader: DataLoader<string, User | undefined>;
}
export interface Context {
  prisma: PrismaClient;
  loaders: IDataLoaders;
}