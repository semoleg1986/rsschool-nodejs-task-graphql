import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';


export const subToUser = (prisma: PrismaClient) => new DataLoader(async (keys: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: {
        userSubscribedTo: {
          some: {
            authorId: { in: keys as string[] },
          },
        },
      },
    });

  return keys.map(() => users);
});