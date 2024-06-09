import { PrismaClient } from "@prisma/client";
import { scheduleDto } from "../../dto/schedule/scheduleDto";
import { HttpException } from "../../../@types/HttpException";

export class ScheduleRepository {
  private prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(scheduleDto: scheduleDto): Promise<scheduleDto> {
    try {
      const shcedule = await this.prisma.service.create({
        data: {
          customer: scheduleDto.customer,
          haircut_id: scheduleDto.haircut_id,
          user_id: scheduleDto.user_id,
        }
      })
      return shcedule
    } catch (error) {
      throw new HttpException(400, error.message)
    }

  }
}