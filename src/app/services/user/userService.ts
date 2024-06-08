import { UserAuthDto, userAuthSchema } from "../../dto/authDto";
import { UserDto } from "../../dto/userDto";
import { UserRepository } from "../../repository/user/userRepository";
import { compareSync, hashSync } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

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

  async login(userAuthDto: UserAuthDto): Promise<UserAuthDto | null> {
    try {
      const validateAuth = userAuthSchema.parse(userAuthDto);

      const findUser = await this.userRepository.findUserByEmail(validateAuth.email);

      if (!findUser) {
        throw new Error("Email or password incorrect");
      }

      const passwordMatch = compareSync(userAuthDto.password, findUser.password);

      if (!passwordMatch) {
        throw new Error("Email or password incorrect");
      }

      const token = sign(
        {
          name: findUser.name,
          email: findUser.email,
        },
        process.env.JWT_SECRET,
        {
          subject: findUser.id,
          expiresIn: "30d",
        }
      );

      return {
        email: findUser.email,
        token,
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async findUserById(id: string): Promise<UserDto | null> {
    try {
      const findUser = await this.userRepository.findUserById(id);
      if(!findUser){
        throw new Error("User not found")
      }
      return findUser
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}