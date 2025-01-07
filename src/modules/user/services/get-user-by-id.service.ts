import { Injectable, NotFoundException } from "@nestjs/common";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

type GetUserByIdServiceRequest = {
  id: number;
};

@Injectable()
class GetUserByIdService {
  constructor(private readonly userRepository: InMemoryUserRepository) {}

  public async execute({ id }: GetUserByIdServiceRequest) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }
}

export { GetUserByIdService };
