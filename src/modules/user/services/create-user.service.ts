import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { UserDatabaseRepository } from "../repositories/user-database.repository";

type CreateUserServiceRequest = {
  name: string;
  email: string;
  password: string;
};

@Injectable()
class CreateUserService {
  constructor(private readonly userRepository: UserDatabaseRepository) {}

  public async execute({ name, email, password }: CreateUserServiceRequest) {
    const userAlreadyExists = await this.userRepository.getUserByEmail(email);

    if (userAlreadyExists) {
      throw new ConflictException("Usuário já cadastrado");
    }

    const hashPassword = await hash(password, 10);

    const user = await this.userRepository.createUser({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export { CreateUserService };
