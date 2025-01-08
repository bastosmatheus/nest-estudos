import { describe, test, beforeEach, expect } from "vitest";
import { InMemoryUserRepository } from "../repositories/in-memory-user.repository";
import { CreateUserService, GetUserByIdService } from "../services";

let userRepository: InMemoryUserRepository;
let createUserService: CreateUserService;
let getUserByIdService: GetUserByIdService;

describe("Teste unitário: GetUserByIdService", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();

    createUserService = new CreateUserService(userRepository);
    getUserByIdService = new GetUserByIdService(userRepository);
  });

  test("Deve ser possivel buscar um usuário", async () => {
    await createUserService.execute({
      name: "Matheus",
      email: "matheus@gmail.com",
      password: "102030",
    });

    const user = await getUserByIdService.execute({
      id: 1,
    });

    expect(user).toBeTruthy();
  });

  test("Não deve retornar se o usuário não existe", async () => {
    expect(async () => {
      await getUserByIdService.execute({
        id: 2003,
      });
    }).rejects.toThrowError("Usuário não encontrado");
  });
});
