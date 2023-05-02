import {
  CreateAlunoContoller,
  DeleteAlunoController,
  ListAlunoController,
  SearchAlunoByNameController,
  ShowAlunoController,
  UpdateAlunoController,
} from "../../src/controllers/alunoController";
import { HttpException, HttpStatusCode } from "../../src/controllers/controller_base";
import { userService } from "../../src/services/alunoService";

const request = {
  body: {
    nome: "Guilhere",
    idade: 25,
    endereco: "Foz do iguacu",
  },
};

describe("Aluno controllers", () => {
  let pessoa: any;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    pessoa = {
      nome: "Guilhere",
      idade: 25,
      endereco: "Foz do iguacu",
    };
  });

  it("Create aluno controller", async () => {
    const expectedAluno = {
      id: 1,
      ...pessoa,
    };

    const userServiceCreateSpy = jest
      .spyOn(userService, "create")
      .mockResolvedValue(expectedAluno);

    const createAlunoContoller = new CreateAlunoContoller();
    const res = await createAlunoContoller.handle(request);

    expect(userServiceCreateSpy).toHaveBeenCalledWith(
      "Guilhere",
      25,
      "Foz do iguacu"
    );

    expect(res.statusCode).toBe(HttpStatusCode.Created);
    expect(res.body).toBe(expectedAluno);
  });

  it("Update aluno controller", async () => {
    const expectedAluno = {
      id: 1,
      ...pessoa,
    };

    const userServiceCreateSpy = jest
      .spyOn(userService, "update")
      .mockResolvedValue(expectedAluno);

    const updateAlunoController = new UpdateAlunoController();
    const res = await updateAlunoController.handle({
      body: request.body,
      params: {
        id: 1,
      },
    });

    expect(userServiceCreateSpy).toHaveBeenCalledWith(
      1,
      "Guilhere",
      25,
      "Foz do iguacu"
    );

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedAluno);
  });

  it("Update aluno controller with error", async () => {
  
    const userServiceCreateSpy = jest
      .spyOn(userService, "update")
      .mockResolvedValue(null);

    const updateAlunoController = new UpdateAlunoController();
    const res = await updateAlunoController.handle({
      body: request.body,
      params: {
        id: 1,
      },
    });

    expect(userServiceCreateSpy).toHaveBeenCalledWith(
      1,
      "Guilhere",
      25,
      "Foz do iguacu"
    );

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({"message": "User not found"});
  });

  it("Delete aluno controller", async () => {
    const expectedAluno = {
      id: 1,
      ...pessoa,
    };

    const userServiceCreateSpy = jest
      .spyOn(userService, "remove")
      .mockResolvedValue(expectedAluno);

    const deleteAlunoController = new DeleteAlunoController();
    const res = await deleteAlunoController.handle({
      params: {
        id: 1,
      },
    });

    expect(userServiceCreateSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedAluno);
  });

  it("Delete aluno controller with error", async () => {


    const userServiceCreateSpy = jest
      .spyOn(userService, "remove")
      .mockResolvedValue(null);

    const deleteAlunoController = new DeleteAlunoController();
    const res = await deleteAlunoController.handle({
      params: {
        id: 1,
      },
    });

    expect(userServiceCreateSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({"message": "User not found"});
  });

  it("Show aluno controller", async () => {
    const expectedAluno = {
      id: 1,
      ...pessoa,
    };

    const userServiceCreateSpy = jest
      .spyOn(userService, "show")
      .mockResolvedValue(expectedAluno);

    const showAlunoController = new ShowAlunoController();
    const res = await showAlunoController.handle({
      params: {
        id: 1,
      },
    });

    expect(userServiceCreateSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedAluno);
  });


  it("Show aluno controller with error", async () => {
 

    const userServiceCreateSpy = jest
      .spyOn(userService, "show")
      .mockResolvedValue(null);

    const showAlunoController = new ShowAlunoController();
    const res = await showAlunoController.handle({
      params: {
        id: 51,
      },
    });

    expect(userServiceCreateSpy).toHaveBeenCalledWith(51);

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({"message": "User not found"});
  });

  it("Search aluno by name controller", async () => {
    const expectedAluno = {
      id: 1,
      ...pessoa,
    };

    const userServiceCreateSpy = jest
      .spyOn(userService, "searchByName")
      .mockResolvedValue(expectedAluno);

    const searchAlunoByNameController = new SearchAlunoByNameController();
    const res = await searchAlunoByNameController.handle({
      params: {
        nome: "Guilhere",
      },
    });

    expect(userServiceCreateSpy).toHaveBeenCalledWith("Guilhere");

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedAluno);
    expect(res.body.nome).toBe("Guilhere");
  });

  it("List array alunos", async () => {
    const expectedAlunos = [{
      id: 1,
      ...pessoa,
    }];

    const userServiceCreateSpy = jest
      .spyOn(userService, "list")
      .mockResolvedValue(expectedAlunos);

    const listAlunosController = new ListAlunoController();
    const res = await listAlunosController.handle({});

    expect(userServiceCreateSpy).toHaveBeenCalledWith();

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedAlunos);
  });
});