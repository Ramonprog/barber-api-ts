import { PrismaClient } from "@prisma/client";
import { CreateHairCutDto } from "../../dto/createHairCut";
export class HairCutRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

 async createHairCut({name,price}: CreateHairCutDto, user_id:string): Promise<CreateHairCutDto> {
    try {
      const newHairCut = await this.prisma.haircut.create({
        data: {
          name,
          price,
          user_id
        },
      });
      return newHairCut;
    } catch (error) {
      throw new Error(error.message);
    }
}
}

