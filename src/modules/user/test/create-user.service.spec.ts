import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";
import { CreateUserService } from "../services/create-user.service";

let userRepository: InMemoryUserRepository;
let createUserService: CreateUserService;

describe("Teste unitário: CreateUserService", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    createUserService = new CreateUserService(userRepository);
  });

  test("Deve ser possivel criar um usuário", async () => {
    const user = await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    expect(user).toBeTruthy();
  });

  test("Não deve criar se o usuário já foi cadastrado", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    expect(async () => {
      await createUserService.execute({
        name: "Roberto",
        email: "matheus@gmail.com",
        password: "12345",
      });
    }).rejects.toThrow("Usuário já cadastrado");
  });
});
