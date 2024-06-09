import { PrismaClient } from "@prisma/client";
import { CreateHairCutDto } from "../../dto/haircut/createHairCut";
import { HiarcutRequest } from "../../dto/haircut/haircutRequest";
import { HairCutList } from "../../dto/haircut/haisCutList";
import { HairCutUpdateDto } from "../../dto/haircut/hairCutUpdateDto";
import { HttpException } from "../../../types/HttpException";
export class HairCutRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createHairCut({ name, price }: CreateHairCutDto, user_id: string): Promise<CreateHairCutDto> {
    if (!user_id || user_id as string === '') throw new Error('User not found')
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

  async countHairCut(id: string) {
    try {
      const haircuts = await this.prisma.haircut.count({
        where: {
          user_id: id
        }
      });
      return haircuts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async allHaircuts(hairCutRequest: HiarcutRequest): Promise<HairCutList[]> {
    try {
      const haircuts = await this.prisma.haircut.findMany(
        {
          where: {
            user_id: hairCutRequest.user_id,
            status: hairCutRequest.status
          }
        }
      );
      return haircuts;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateHairCut({ haircut_id, name, price, status, user_id }: HairCutUpdateDto): Promise<HairCutUpdateDto> {
    try {
      return await this.prisma.haircut.update({
        where: {
          user_id: user_id,
          id: haircut_id
        },
        data: {
          name,
          price,
          status
        }
      
      })
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  }

  async hairCutDetail(haircut_id: string) {
    
    try {
      const haircut = await this.prisma.haircut.findFirst({
        where: {
          id: haircut_id,
        }
      });
      return haircut;
    } catch (error) {
      throw new HttpException(400, error.message);
    }
  }
}
