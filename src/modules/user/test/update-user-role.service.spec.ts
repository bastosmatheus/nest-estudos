import { describe, test, beforeEach, expect } from "vitest";
import { CreateUserService, UpdateUserPasswordService } from "../services";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

let userRepository: InMemoryUserRepository;
let createUserService: CreateUserService;
let updateUserPasswordService: UpdateUserPasswordService;

describe("Teste unitário: UpdateUserPasswordService", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    createUserService = new CreateUserService(userRepository);
    updateUserPasswordService = new UpdateUserPasswordService(userRepository);
  });

  test("Deve retornar todos usuários", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    const user = await updateUserPasswordService.execute({
      id: 1,
      password: "newpassword",
    });

    expect(user).toBeTruthy();
  });

  test("Não deve atualizar se o usuário não existe ", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    expect(async () => {
      await updateUserPasswordService.execute({
        id: 2003,
        password: "newpassword",
      });
    }).rejects.toThrow("Usuário não encontrado");
  });
});
