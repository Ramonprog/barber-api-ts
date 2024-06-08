import { UserDto } from "../../dto/userDto";
import { UserRepository } from "../../repository/user/userRepository";

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
      return this.userRepository.createUser(userDto);
    } catch (error: any) { // Tipando 'error' como 'any' para acessar 'message'
      throw new Error(error.message);
    }
  }
}
