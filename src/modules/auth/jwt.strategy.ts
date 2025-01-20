import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt } from "passport-jwt";
import { payloadSchema, PayloadToken } from "src/schemas/auth-schemas";
import { UserDatabaseRepository } from "../user/repositories/user-database.repository";

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserDatabaseRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "jwt-secret",
    });
  }

  async validate(payload: PayloadToken) {
    payloadSchema.parse(payload);

    const { sub } = payload;

    const userExists = await this.userRepository.getUserById(sub);

    if (!userExists) {
      throw new UnauthorizedException();
    }

    return true;
  }
}

export { JwtStrategy };
