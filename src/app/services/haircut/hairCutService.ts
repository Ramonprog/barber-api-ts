import { HttpException } from "../../../types/HttpException";
import { CreateHairCutDto, createHairCutSchema } from "../../dto/createHairCut";
import { HairCutRepository } from "../../repository/haircut/hairCutRepository";
import { UserRepository } from "../../repository/user/userRepository";

export class HairCutService {
  private hairCutRepository: HairCutRepository;
  private userRepository: UserRepository;

  constructor(hairCutRepository: HairCutRepository) {
    this.hairCutRepository = hairCutRepository;
    this.userRepository = new UserRepository();
  }

  async createHairCut(CreateHairCutDto:CreateHairCutDto, user_id: string): Promise<CreateHairCutDto> {
 
    try {
      const hairCutQuantity = await this.hairCutRepository.countHairCut(user_id);
    
      const user = await this.userRepository.findUserById(user_id);
   
      if(hairCutQuantity >= 2 && user?.subscriptions?.status !== 'active') {
        throw new HttpException(401, 'You have reached the limit of haircuts, please subscribe to continue using our services');
      }

      const newHairCut = await this.hairCutRepository.createHairCut(CreateHairCutDto, user_id);
      return newHairCut;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}