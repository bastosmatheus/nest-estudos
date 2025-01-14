import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcrypt";
import { UserDatabaseRepository } from "src/modules/user/repositories/user-database.repository";

type SignInServiceRequest = {
  email: string;
  password: string;
};

@Injectable()
class SignInService {
  constructor(
    private readonly userRepository: UserDatabaseRepository,
    private readonly jwtService: JwtService
  ) {}

  public async execute({ email, password }: SignInServiceRequest) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    const payload = { sub: user.id };

    const accessToken = this.jwtService.signAsync(payload);

    return accessToken;
  }
}

export { SignInService };
