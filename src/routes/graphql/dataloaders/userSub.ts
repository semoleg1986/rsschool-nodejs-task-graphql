import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';


export const UserSubs = (prisma: PrismaClient) => new DataLoader(async (keys: readonly string[]) => {
  const users = await prisma.user.findMany({
    where: {
      subscribedToUser: {
        some: {
          subscriberId: { in: keys as string[] },
        },
      },
    },
  });

  return keys.map(() => users);
});