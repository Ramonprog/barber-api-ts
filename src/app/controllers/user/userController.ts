import { Request, Response } from "express";
import { UserService } from "../../services/user/userService";
import { HttpException } from "../../../types/HttpException";
import { userSchema } from "../../dto/userDto";
import { z } from "zod";

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
      return res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
         return res.status(400).json({
          status: 400,
          message: 'Validation error',
          errors: error.errors, 
        });
      }
    if(error instanceof HttpException) {
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
}
