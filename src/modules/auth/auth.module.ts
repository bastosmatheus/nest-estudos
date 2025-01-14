import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { UserDatabaseRepository } from "../user/repositories/user-database.repository";
import { DatabaseService } from "src/database/database.service";
import { SignInService } from "./services";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: "jwt-secret",
      signOptions: { expiresIn: "1d" },
    }),
  ],
  providers: [
    SignInService,
    UserDatabaseRepository,
    DatabaseService,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
