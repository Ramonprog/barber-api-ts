import { Request, Response } from "express";
import { HairCutService } from "../../services/haircut/hairCutService";
import { createHairCutSchema } from "../../dto/createHairCut";
import { z } from "zod";
import { HttpException } from "../../../types/HttpException";
import { haircutSRequestSchema } from "../../dto/haircutRequest";


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
    
      throw new HttpException(400, error.message)
    }
  }

  async allHaircuts(req: Request, res: Response): Promise<Response> {
    const { user_id } = req
    const {status} = req.query
    const statusParse = status === 'true' ? true : false

    const parse = haircutSRequestSchema.parse({user_id, status: statusParse})
    try {
      const haircuts = await this.hairCutService.allHaircuts(parse)
      return res.status(200).json(haircuts)
    } catch (error: any) {
      throw new HttpException(400, error.message)
    }
  }

}
