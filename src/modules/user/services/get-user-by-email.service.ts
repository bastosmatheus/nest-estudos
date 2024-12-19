import { UserDatabaseRepository } from "../repositories/user-database.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

type GetUserByEmailServiceRequest = {
  email: string;
};

@Injectable()
class GetUserByEmailService {
  constructor(private readonly userRepository: UserDatabaseRepository) {}

  public async execute({ email }: GetUserByEmailServiceRequest) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }
}

export { GetUserByEmailService };
