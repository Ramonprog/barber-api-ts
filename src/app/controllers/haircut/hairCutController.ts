import { Request, Response } from "express";
import { HairCutService } from "../../services/haircut/hairCutService";
import { createHairCutSchema } from "../../dto/createHairCut";
import { z } from "zod";
import { HttpException } from "../../../types/HttpException";


export class HairCutController {
  private hairCutService: HairCutService;

  constructor(hairCutService: HairCutService) {
    this.hairCutService = hairCutService;
  }

  async createHairCut(req: Request, res: Response): Promise<Response> {
    const parseHairCut = createHairCutSchema.parse(req.body);
    const { user_id } = req
    try {
      const hairCut = await this.hairCutService.createHairCut(parseHairCut, user_id)
      return res.status(201).json(hairCut)

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

}
