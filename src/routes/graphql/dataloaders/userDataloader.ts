import { PrismaClient, User } from "@prisma/client";
import DataLoader from "dataloader";

export const userLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (keys: readonly string[]) => {
      const users: User[] = await prisma.user.findMany({
        where: {
          id: { in: keys as string[] },
        },
        include: { subscribedToUser: true, userSubscribedTo: true },
      });
  
      const sortedUsers = keys.map((id) => users.find((user) => user.id === id));
      return sortedUsers;
    });
  };