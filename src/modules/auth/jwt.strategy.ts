import { Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ExtractJwt } from "passport-jwt";
import { payloadSchema, PayloadToken } from "src/schemas/auth-schemas";

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "jwt-secret",
    });
  }

  async validate(payload: PayloadToken) {
    return payloadSchema.parse(payload);
  }
}

export { JwtStrategy };
