import { UserDto } from "../../dto/userDto";
import { UserRepository } from "../../repository/user/userRepository";
import {hashSync} from 'bcryptjs'

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

async create(userDto: UserDto): Promise<UserDto> {
    try {
      const userExists = await this.userRepository.findUserByEmail(userDto.email);
      
      if (userExists) {
        throw new Error("User already exists");
      }

      const passwordHash = hashSync(userDto.password, 8);

      const user = {
        ...userDto,
        password: passwordHash
      };

      return this.userRepository.createUser(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
