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
import { UserDatabaseRepository } from "./repositories/user-database.repository";

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
})
export class UserModule {}
