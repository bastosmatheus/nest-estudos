import { Injectable, NotFoundException } from "@nestjs/common";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

type GetUserByEmailServiceRequest = {
  email: string;
};

@Injectable()
class GetUserByEmailService {
  constructor(private readonly userRepository: InMemoryUserRepository) {}

  public async execute({ email }: GetUserByEmailServiceRequest) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }
}

export { GetUserByEmailService };
