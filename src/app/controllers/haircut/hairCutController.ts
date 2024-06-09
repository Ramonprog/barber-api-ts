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
        throw new HttpException(400, 'Validation error', error.errors)
      }
      throw new HttpException(400, error.message)
    }
  }

}
