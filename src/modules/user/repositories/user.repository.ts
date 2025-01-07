import { User } from "@prisma/client";
import { CreateUserDto } from "../dtos/create-user.dto";

interface UserRepository {
  getUsers(): Promise<User[]>;
  getUserById(id: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  createUser(user: CreateUserDto): Promise<User>;
  updatePassword(id: number, newPassword: string): Promise<User>;
  updateRole(id_employee: number): Promise<User>;
  deleteUser(id: number): Promise<User>;
}

export { UserRepository };
