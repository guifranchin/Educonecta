import { alunoController } from "../../src/controllers/alunoController";
import { userService } from "../../src/services/alunoService";

const request = {
  body: {
    nome: "Guilhere",
    idade: 25,
    endereco: "Foz do iguacu",
  },
};

const response = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("POST /alunos", () => {
  let pessoa: any;

  beforeAll(() => {
    pessoa = {
      nome: "Guilhere",
      idade: 25,
      endereco: "Foz do iguacu",
    };
  });

  it("deve criar um novo usuário", async () => {
    const expectedAluno = {
      id: 1,
      ...pessoa,
    };
    const userServiceCreateSpy = jest
      .spyOn(userService, "create")
      .mockResolvedValue(expectedAluno);

    await alunoController.create(request, response);

    expect(userServiceCreateSpy).toHaveBeenCalledWith('Guilhere', 25, 'Foz do iguacu');
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(expectedAluno);
  });



});
