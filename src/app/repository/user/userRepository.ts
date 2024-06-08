import { PrismaClient } from "@prisma/client";
import { UserDto } from "../../dto/userDto";
import { UserAuthDto } from "../../dto/authDto";

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async createUser(userDto: UserDto) {
    return this.prisma.user.create({
      data: {
        name: userDto.name,
        email: userDto.email,
        password: userDto.password
      }
    });
  }

  async findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email
      },include:{
       subscriptions:true
      }
    });
  }

 
}
