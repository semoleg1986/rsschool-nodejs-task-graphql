import { PrismaClient } from '@prisma/client';
import { MemberType, Post, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export interface IDataLoaders {
  postDataLoader: DataLoader<string, Post[] | undefined>;
  memberDataLoader: DataLoader<string, MemberType | undefined>;
  profileDataLoader: DataLoader<string, Profile | undefined>;
  userDataLoader: DataLoader<string, User | undefined>;
  userSubDataLoader: DataLoader<string, User[]>;
  subUserDataLoader:DataLoader<string, User[]>;
}
export interface Context {
  prisma: PrismaClient;
  loaders: IDataLoaders;
}