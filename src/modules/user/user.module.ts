import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import {
  CreateUserService,
  DeleteUserService,
  GetUserByEmailService,
  GetUserByIdService,
  GetUsersService,
  UpdateUserPasswordService,
} from "./services";
import { DatabaseService } from "src/database/database.service";
import { InMemoryUserRepository } from "./repositories/in-memory-user.repository";

@Module({
  controllers: [UserController],
  providers: [
    GetUsersService,
    GetUserByEmailService,
    GetUserByIdService,
    CreateUserService,
    UpdateUserPasswordService,
    DeleteUserService,
    DatabaseService,
    InMemoryUserRepository,
  ],
  exports: [GetUserByEmailService],
})
export class UserModule {}
