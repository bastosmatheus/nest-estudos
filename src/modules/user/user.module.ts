import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import {
  CreateUserService,
  DeleteUserService,
  GetUserByEmailService,
  GetUserByIdService,
  GetUsersService,
  UpdateUserPasswordService,
  UpdateUserRoleService,
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
    UpdateUserRoleService,
    DeleteUserService,
    DatabaseService,
    UserDatabaseRepository,
  ],
})
export class UserModule {}
