import {
  CreateProfessorContoller,
  DeleteProfessorController,
  SearchProfessorByEspecialidadeController,
  SearchProfessorByNomeController,
  UpdateProfessorController,
} from "../../src/controllers/professorController";
import { HttpStatusCode } from "../../src/controllers/controller_base";
import { professorService } from "../../src/services/professorService";
import { ListAlunoController } from "../../src/controllers/alunoController";
import { ListProfessoresController } from "../../src/controllers/professorController";
import { FindProfessorByIdController } from "../../src/controllers/professorController";

const request = {
  body: {
    nome: "Guilheme",
    endereco: "rua",
    especialidade: "dar aula",
    email: "guilheme@email.com"
  },
};

describe("Professor controllers", () => {
  let professor: any;

  beforeAll(() => {
    professor = {
      nome: "Guilheme",
      endereco: "rua",
      especialidade: "dar aula",
      email: "guilheme@email.com"
    };
  });

  it("Create professor controller", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "create")
      .mockResolvedValue(expectedProfessor);

    const createProfessorContoller = new CreateProfessorContoller();
    const res = await createProfessorContoller.handle(request);

    expect(professorServiceCreateSpy).toHaveBeenCalledWith(
      "Guilheme",
      "rua",
      "dar aula"
    );

    expect(res.statusCode).toBe(HttpStatusCode.Created);
    expect(res.body).toBe(expectedProfessor);
  });

  it("List professor controller", async () => {
    const expectedProfessores = [{
      id: 1,
      ...professor,
    }];

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "list")
      .mockResolvedValue(expectedProfessores);

    const listAlunoController = new ListProfessoresController();
    const res = await listAlunoController.handle({});

    expect(professorServiceCreateSpy).toHaveBeenCalledWith();

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedProfessores);
  });

  it("Update professor controller", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "update")
      .mockResolvedValue(expectedProfessor);

    const updateProfessorController = new UpdateProfessorController();
    const res = await updateProfessorController.handle({
      body: request.body,
      params: {
        id: 1,
      },
    });

    expect(professorServiceCreateSpy).toHaveBeenCalledWith(
      1,
      "Guilheme",
      "guilheme@email.com",
      "dar aula"
    );

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedProfessor);
  });

  it("Update professor controller with error", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "update")
      .mockResolvedValue(null as any);

    const updateProfessorController = new UpdateProfessorController();
    const res = await updateProfessorController.handle({
      body: request.body,
      params: {
        id: 1,
      },
    });

    expect(professorServiceCreateSpy).toHaveBeenCalledWith(
      1,
      "Guilheme",
      "guilheme@email.com",
      "dar aula"
    );

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({"message": "Professor not found"});
  });

  it("Delete professor controller", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "delete")
      .mockResolvedValue(expectedProfessor);

    const deleteProfessorController = new DeleteProfessorController();
    const res = await deleteProfessorController.handle({
      params: {
        id: 1,
      },
    });

    expect(professorServiceCreateSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedProfessor);
  });

  it("Delete professor controller with error", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "delete")
      .mockResolvedValue(null as any);

    const deleteProfessorController = new DeleteProfessorController();
    const res = await deleteProfessorController.handle({
      params: {
        id: 1,
      },
    });

    expect(professorServiceCreateSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({"message": "Professor not found"});
  });

  it("Find professor by id", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceFindByIdSpy = jest
      .spyOn(professorService, "findById")
      .mockResolvedValue(expectedProfessor);

    const findProfessorByIdController = new FindProfessorByIdController();
    const res = await findProfessorByIdController.handle({
      params: {
        id: 1,
      },
    });

    expect(professorServiceFindByIdSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedProfessor);
  });

  it("Find professor by id with error", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceFindByIdSpy = jest
      .spyOn(professorService, "findById")
      .mockResolvedValue(null);

    const findProfessorByIdController = new FindProfessorByIdController();
    const res = await findProfessorByIdController.handle({
      params: {
        id: 1,
      },
    });

    expect(professorServiceFindByIdSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({"message": "Professor not found"});
  });

  it("Search professor by name controller", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "findByNome")
      .mockResolvedValue(expectedProfessor);

    const searchCursoByNomeController = new SearchProfessorByNomeController();
    const res = await searchCursoByNomeController.handle({
      params: {
        nome: "Guilheme",
      },
    });

    expect(professorServiceCreateSpy).toHaveBeenCalledWith("Guilheme");

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedProfessor);
    expect(res.body.nome).toBe("Guilheme");
  });

  it("Search professor by name controller with error", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "findByNome")
      .mockResolvedValue(null as any);

    const searchCursoByNomeController = new SearchProfessorByNomeController();
    const res = await searchCursoByNomeController.handle({
      params: {
        nome: "Guilheme",
      },
    });

    expect(professorServiceCreateSpy).toHaveBeenCalledWith("Guilheme");

    expect(res.statusCode).toBe(HttpStatusCode.NotFound);
    expect(res.body).toStrictEqual({"message": "Professor not found"});
  });

  it("Search professor by especialidade controller", async () => {
    const expectedProfessor = {
      id: 1,
      ...professor,
    };

    const professorServiceCreateSpy = jest
      .spyOn(professorService, "findByEspecialidade")
      .mockResolvedValue(expectedProfessor);

    const searchProfessorByEspecialidadeController =
      new SearchProfessorByEspecialidadeController();
    const res = await searchProfessorByEspecialidadeController.handle({
      params: {
        especialidade: "dar aula",
      },
    });

    expect(professorServiceCreateSpy).toHaveBeenCalledWith("dar aula");

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedProfessor);
    expect(res.body.especialidade).toBe("dar aula");
  });
});
