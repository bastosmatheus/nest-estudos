import { describe, test, beforeEach, expect } from "vitest";
import { CreateUserService, GetUsersService } from "../services";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

let userRepository: InMemoryUserRepository;
let createUserService: CreateUserService;
let getUsersService: GetUsersService;

describe("Teste unitário: GetUsersService", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    createUserService = new CreateUserService(userRepository);
    getUsersService = new GetUsersService(userRepository);
  });

  test("Deve retornar todos usuários", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    await createUserService.execute({
      name: "Roberto",
      email: "roberto@gmail.com",
      password: "12345",
    });

    const users = await getUsersService.execute();

    expect(users).toBeTruthy();
    expect(users).toHaveLength(2);
  });
});
