import { CreateTurmaContoller, DeleteTurmaController, SearchTurmaByAnoController, SearchTurmaBySemestreController, UpdateTurmaController } from "../../src/controllers/turmaController";
import { HttpStatusCode } from "../../src/controllers/controller_base";
import { turmaService } from "../../src/services/turmaService";

const request = {
  body: {
    ano: "2023",
    semestre: "1",
    cursoId: 1,
    professorId: 1
  },
};

describe("Curso controllers", () => {
  let turma: any;

  beforeAll(() => {
    turma = {
      ano: "2023",
      semestre: "1",
      cursoId: 1,
    professorId: 1
    };
  });

  it("Create turma controller", async () => {
    const expectedTurma = {
      id: 1,
      ...turma,
    };

    const turmaServiceCreateSpy = jest
      .spyOn(turmaService, "create")
      .mockResolvedValue(expectedTurma);

    const createTurmaContoller = new CreateTurmaContoller();
    const res = await createTurmaContoller.handle(request);

    expect(turmaServiceCreateSpy).toHaveBeenCalledWith("2023", "1");

    expect(res.statusCode).toBe(HttpStatusCode.Created);
    expect(res.body).toBe(expectedTurma);
  });

  it("Update turma controller", async () => {
    const expectedTurma = {
      id: 1,
      ...turma,
    };

    const turmaServiceCreateSpy = jest
      .spyOn(turmaService, "update")
      .mockResolvedValue(expectedTurma);

    const updateTurmaController = new UpdateTurmaController();
    const res = await updateTurmaController.handle({
      body: request.body,
      params: {
        id: 1,
      },
    });

    expect(turmaServiceCreateSpy).toHaveBeenCalledWith(1, "2023", "1", 1, 1);

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedTurma);
  });

  it("Delete turma controller", async () => {
    const expectedTurma = {
      id: 1,
      ...turma,
    };

    const turmaServiceCreateSpy = jest
      .spyOn(turmaService, "delete")
      .mockResolvedValue(expectedTurma);

    const deleteTurmaController = new DeleteTurmaController();
    const res = await deleteTurmaController.handle({
      params: {
        id: 1,
      },
    });

    expect(turmaServiceCreateSpy).toHaveBeenCalledWith(1);

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedTurma);
  });

  it("Search turma by ano controller", async () => {
    const expectedTurma = {
      id: 1,
      ...turma,
    };

    const turmaServiceCreateSpy = jest
      .spyOn(turmaService, "findByYear")
      .mockResolvedValue(expectedTurma);

    const searchTurmaByAnoController = new SearchTurmaByAnoController();
    const res = await searchTurmaByAnoController.handle({
      params: {
        ano: "2023",
      },
    });

    expect(turmaServiceCreateSpy).toHaveBeenCalledWith("2023");

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedTurma);
    expect(res.body.ano).toBe("2023");
  });

  it("Search turma by semestre controller", async () => {
    const expectedTurma = {
      id: 1,
      ...turma,
    };

    const turmaServiceCreateSpy = jest
      .spyOn(turmaService, "findBySemester")
      .mockResolvedValue(expectedTurma);

    const searchTurmaBySemestreController =
      new SearchTurmaBySemestreController();
    const res = await searchTurmaBySemestreController.handle({
      params: {
        semestre: "1",
      },
    });

    expect(turmaServiceCreateSpy).toHaveBeenCalledWith("1");

    expect(res.statusCode).toBe(HttpStatusCode.Ok);
    expect(res.body).toBe(expectedTurma);
    expect(res.body.semestre).toBe("1");
  });
});
