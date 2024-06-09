import { CreateHairCutDto, createHairCutSchema } from "../../dto/createHairCut";
import { HairCutRepository } from "../../repository/haircut/hairCutRepository";

export class HairCutService {
  private hairCutRepository: HairCutRepository;

  constructor(hairCutRepository: HairCutRepository) {
    this.hairCutRepository = hairCutRepository;
  }

  async createHairCut(CreateHairCutDto:CreateHairCutDto, user_id: string): Promise<CreateHairCutDto> {
 
    try {
      const newHairCut = await this.hairCutRepository.createHairCut(CreateHairCutDto, user_id);
      return newHairCut;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}