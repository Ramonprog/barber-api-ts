import { UserDto } from "../../dto/userDto";
import { UserRepository } from "../../repository/user/userRepository";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(userDto: UserDto): Promise<UserDto> {
    return this.userRepository.createUser(userDto);
  }
}
