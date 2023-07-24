import { PrismaClient } from "@prisma/client";
import { memberLoader } from "./memberDataloader.js";
import { postLoader } from "./postDataloader.js";
import { profileLoader } from "./profileDataloader.js";
import { userLoader } from "./userDataloader.js";
import { IDataLoaders } from "../types/context.js";

export const createDataLoaders = (prisma: PrismaClient):IDataLoaders => {
    return {
        postDataLoader: postLoader(prisma),
        memberDataLoader: memberLoader(prisma),
        profileDataLoader: profileLoader(prisma),
        userDataLoader: userLoader(prisma),
    }
  }