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
import { UserDatabaseRepository } from "./repositories/user-database.repository";
import { DatabaseService } from "src/database/database.service";

@Module({
  controllers: [UserController],
  providers: [
    GetUsersService,
    GetUserByEmailService,
    GetUserByIdService,
    CreateUserService,
    UpdateUserPasswordService,
    DeleteUserService,
    UserDatabaseRepository,
    DatabaseService,
  ],
  exports: [GetUserByEmailService],
})
export class UserModule {}
