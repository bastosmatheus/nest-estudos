import { UserRepository } from "../repositories/user.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

type DeleteUserServiceRequest = {
  id: number;
};

@Injectable()
class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id }: DeleteUserServiceRequest) {
    const userExists = await this.userRepository.getUserById(id);

    if (!userExists) {
      throw new NotFoundException();
    }

    const user = await this.userRepository.deleteUser(id);

    return user;
  }
}

export { DeleteUserService };
