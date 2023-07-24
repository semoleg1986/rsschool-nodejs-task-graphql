import DataLoader from "dataloader";
import { MemberType, PrismaClient} from '@prisma/client';

export const memberLoader = (prisma: PrismaClient) => {
    return new DataLoader(async (keys: readonly string[]) => {
      const members: MemberType[] = await prisma.memberType.findMany({
        where: {
          id: { in: keys as string[] },
        },
      });
  
      const sortedMember = keys.map((id) => members.find((member) => member.id === id));
      
      return sortedMember;
    });
  };