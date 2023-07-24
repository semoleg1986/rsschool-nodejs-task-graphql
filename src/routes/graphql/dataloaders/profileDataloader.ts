import DataLoader from "dataloader";
import { PrismaClient, Profile } from "@prisma/client";

export const profileLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (keys: readonly string[] ) => {
      const profiles: Profile[] = await prisma.profile.findMany({
        where: {
          userId: { in: keys as string[] },
        },
      });
  
      const sortedProfiles = keys.map((id) =>
        profiles.find((profile) => profile.userId === id),
      );
      return sortedProfiles;
    });
  };