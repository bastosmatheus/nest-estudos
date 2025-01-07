import { Injectable, NotFoundException } from "@nestjs/common";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

type DeleteUserServiceRequest = {
  id: number;
};

@Injectable()
class DeleteUserService {
  constructor(private readonly userRepository: InMemoryUserRepository) {}

  public async execute({ id }: DeleteUserServiceRequest) {
    const userExists = await this.userRepository.getUserById(id);

    if (!userExists) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const user = await this.userRepository.deleteUser(id);

    return user;
  }
}

export { DeleteUserService };
