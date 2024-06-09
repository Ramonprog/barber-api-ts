import { PrismaClient } from "@prisma/client";
import { UserDto } from "../../dto/user/userDto";
import { UserAuthDto } from "../../dto/user/authDto";
import {  updateUserDto } from "../../dto/user/updateUserDto";

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
      }, include: {
        subscriptions: true
      }
    });
  }
  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        subscriptions: true,
      }
    });
  }
async updateUser(userDto: updateUserDto, user_id: string): Promise<updateUserDto>{
    return this.prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        name: userDto.name,
        email: userDto.email,
        address: userDto.address,
      }
    });
  }
}

