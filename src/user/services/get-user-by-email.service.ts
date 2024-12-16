import { UserRepository } from "../repositories/user.repository";
import { Injectable, NotFoundException } from "@nestjs/common";

type GetUserByEmailServiceRequest = {
  email: string;
};

@Injectable()
class GetUserByEmailService {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute({ email }: GetUserByEmailServiceRequest) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}

export { GetUserByEmailService };
