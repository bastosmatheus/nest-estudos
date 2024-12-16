import { UserRepository } from "../repositories/user.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

type GetUserByIdServiceRequest = {
  id: number;
};

@Injectable()
class GetUserByIdService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ id }: GetUserByIdServiceRequest) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}

export { GetUserByIdService };
