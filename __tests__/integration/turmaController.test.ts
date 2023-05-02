import request from "supertest";
import app from "../../src/index";

describe("/turma", () => {
    let turma: any;

    beforeAll(() => {
        turma = {
            semestre: "2",
            ano: 2023
        };
    });

    it("deve criar uma nova turma", async () => {
        const expectedTurma = {
            id: expect.anything(),
            ...turma,
            curso_id: null,
            professor_id: null,
            aluno_id: null
        };

        const response = await request(app).post("/api/turmas").send(turma).expect(201);

        expect(response.body).toMatchObject(expectedTurma);
    });

    it("deve atualizar uma turma", async () => {
        const expectedTurma = {
            id: expect.anything(),
            ...turma,
            curso_id: null,
            professor_id: null,
            aluno_id: null
        };

        const response = await request(app).post("/api/turmas").send(turma).expect(201);

        expect(response.body).toMatchObject(expectedTurma);

        const idTurmaCreated = response.body.id;

        const TurmaUpdated = {
            semestre: "1",
            ano: 2027
        };

        const responseUpdated = await request(app).put("/api/turmas/" + idTurmaCreated).send(TurmaUpdated).expect(200);

        const expectedTurmaUpdated = {
            id: idTurmaCreated,
            ...TurmaUpdated,
            curso_id: null,
            professor_id: null,
            aluno_id: null
        };

        expect(responseUpdated.body).toMatchObject([expectedTurmaUpdated]);
    });

});
