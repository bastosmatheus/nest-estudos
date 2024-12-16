import { BadRequestException, Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { hash } from "bcrypt";

type CreateUserServiceRequest = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ name, email, password }: CreateUserServiceRequest) {
    const userAlreadyExists = await this.userRepository.getUserByEmail(email);

    if (userAlreadyExists) {
      throw new BadRequestException();
    }

    const hashPassword = await hash(password, 10);

    const user = await this.userRepository.createUser({ name, email, password: hashPassword });

    return user;
  }
}

export { CreateUserService };
