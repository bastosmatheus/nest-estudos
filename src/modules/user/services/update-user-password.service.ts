import { BadRequestException, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

type UpdateUserPasswordServiceRequest = {
  id: number;
  password: string;
};

@Injectable()
class UpdateUserPasswordService {
  constructor(private readonly userRepository: InMemoryUserRepository) {}

  public async execute({ id, password }: UpdateUserPasswordServiceRequest) {
    const userExists = await this.userRepository.getUserById(id);

    if (!userExists) {
      throw new BadRequestException("Usuário não encontrado");
    }

    const hashPassword = await hash(password, 10);

    const user = await this.userRepository.updatePassword(id, hashPassword);

    return user;
  }
}

export { UpdateUserPasswordService };
