import { HttpException } from "../../../types/HttpException";
import { CreateHairCutDto } from "../../dto/haircut/createHairCut";

import { HairCutUpdateDto } from "../../dto/haircut/hairCutUpdateDto";
import { HiarcutRequest } from "../../dto/haircut/haircutRequest";
import { HairCutList } from "../../dto/haircut/haisCutList";

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
   
      if(hairCutQuantity >= 6 && user?.subscriptions?.status !== 'active') {
        throw new HttpException(401, 'You have reached the limit of haircuts, please subscribe to continue using our services');
      }

      const newHairCut = await this.hairCutRepository.createHairCut(CreateHairCutDto, user_id);
      return newHairCut;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async allHaircuts(hairCutRequest: HiarcutRequest): Promise<HairCutList[]> {
    try {
      const haircuts = await this.hairCutRepository.allHaircuts(hairCutRequest);
      return haircuts;
    } catch (error) {
   throw new HttpException(400, error.message)
    }
  }

  async updateHairCut(hairCutDto: HairCutUpdateDto): Promise<HairCutUpdateDto> {
    try {
      return await this.hairCutRepository.updateHairCut(hairCutDto);
    } catch (error) {
      throw new HttpException(400, error.message)
    }
  }

  async hairCutDetail(haircut_id: string) {

    try {
    if(!haircut_id) {
      throw new HttpException(400, 'Haircut not found')
    }
    
      return await this.hairCutRepository.hairCutDetail(haircut_id);

    } catch (error) {
      throw new HttpException(400, error.message)
    }
  }
}