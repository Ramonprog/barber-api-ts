import { Request, Response } from "express";
import { HairCutService } from "../../services/haircut/hairCutService";


export class HairCutController {
  private hairCutService: HairCutService;

  constructor(hairCutService: HairCutService) {
    this.hairCutService = hairCutService;
  }

  async createHairCut(req: Request, res: Response): Promise<Response> {
    const {user_id} = req
    try {
      const hairCut = await this.hairCutService.createHairCut(req.body, user_id)
      return res.status(201).json(hairCut)
    } catch (error: any) {
      
    }
  }
  
}
