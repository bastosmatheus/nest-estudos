import { describe, test, beforeEach, expect } from "vitest";
import { CreateUserService, DeleteUserService } from "../services";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";

let userRepository: InMemoryUserRepository;
let createUserService: CreateUserService;
let deleteUserService: DeleteUserService;

describe("Teste unitário: UpdateUserPasswordService", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    createUserService = new CreateUserService(userRepository);
    deleteUserService = new DeleteUserService(userRepository);
  });

  test("Deve retornar todos usuários", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    const user = await deleteUserService.execute({
      id: 1,
    });

    expect(user).toBeTruthy();
  });

  test("Não deve atualizar se o usuário não existe", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    expect(async () => {
      await deleteUserService.execute({
        id: 2003,
      });
    }).rejects.toThrow("Usuário não encontrado");
  });
});
