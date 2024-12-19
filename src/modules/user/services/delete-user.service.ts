import { UserDatabaseRepository } from "../repositories/user-database.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

type DeleteUserServiceRequest = {
  id: number;
};

@Injectable()
class DeleteUserService {
  constructor(private readonly userRepository: UserDatabaseRepository) {}

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
