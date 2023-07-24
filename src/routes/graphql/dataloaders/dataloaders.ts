import { PrismaClient } from "@prisma/client";
import { memberLoader } from "./memberDataloader.js";
import { postLoader } from "./postDataloader.js";
import { profileLoader } from "./profileDataloader.js";
import { userLoader } from "./userDataloader.js";

export const createDataLoaders = (prisma: PrismaClient) => {
    return {
        postDataLoader: postLoader(prisma),
        memberDataLoader: memberLoader(prisma),
        profileDataLoader: profileLoader(prisma),
        userDataLoader: userLoader(prisma),
    }
  }