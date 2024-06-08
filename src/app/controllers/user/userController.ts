import { Request, Response } from "express";
import { UserService } from "../../services/user/userService";
import { HttpException } from "../../../types/HttpException";
import { UserDto, userSchema } from "../../dto/userDto";
import { z } from "zod";
import { UserAuthDto, userAuthSchema } from "../../dto/authDto";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const parsedUser = userSchema.parse(req.body);

      // Se a validação passar, prosseguir com a criação do usuário
      const user = await this.userService.create(parsedUser);

      const { password, ...userWithoutPassword } = user;

      return res.status(201).json(userWithoutPassword);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          status: 400,
          message: 'Validation error',
          errors: error.errors,
        });
      }
      if (error instanceof HttpException) {
        return res.status(error.status).json({
          status: error.status,
          message: error.message
        });
      }

      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.login(req.body as UserAuthDto);

      return res.status(200).json(user);

    } catch (error: any) {

      if (error instanceof HttpException) {
        return res.status(error.status).json({
          status: error.status,
          message: error.message
        });
      }

      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }

  async userDetail(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.findUserById(req.params.id);

      const { password, ...userWithoutPassword } = user;

      return res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  }
}
