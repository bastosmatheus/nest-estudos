import { Injectable, NotFoundException } from "@nestjs/common";
import { UserDatabaseRepository } from "../repositories/user-database.repository";

type GetUserByIdServiceRequest = {
  id: number;
};

@Injectable()
class GetUserByIdService {
  constructor(private readonly userRepository: UserDatabaseRepository) {}

  public async execute({ id }: GetUserByIdServiceRequest) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    return user;
  }
}

export { GetUserByIdService };
