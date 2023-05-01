import { Request, Response, Router } from "express";
import { CreateAlunoContoller, DeleteAlunoController, LinkStudentClassController, ListAlunoController, SearchAlunoByNameController, ShowAlunoController, UpdateAlunoController } from "./controllers/alunoController";
import { Controller, HttpRequest, HttpResponse } from "./controllers/controller_base";
import { CreateCursoContoller, LinkCourseClassController, ListCursosController, SearchCursoByNomeController, SearchCursoBySiglaController, UpdateCursoController } from "./controllers/cursosController";
import { CreateProfessorContoller, DeleteProfessorController, FindProfessorByIdController, LinkTeacherClassController, ListProfessoresController, SearchProfessorByEspecialidadeController, SearchProfessorByNomeController, UpdateProfessorController } from "./controllers/professorController";
import { CreateTurmaContoller, DeleteTurmaController, ListTurmasController, SearchTurmaByAnoController, SearchTurmaBySemestreController, UpdateTurmaController } from "./controllers/turmaController";

function adaptExpressRoute(controller: Controller) {
    return async (req: Request, res: Response) => {
        const httpRequest: HttpRequest = {
            body: req.body,
            headers: req.headers,
            params: req.params,
            query: req.query
        }

        const httpResponse: HttpResponse = await controller.handle(httpRequest)
        return res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}

const routes = Router();

// rotas para alunos
routes.post("/alunos", adaptExpressRoute(new CreateAlunoContoller));
routes.put("/alunos/:id", adaptExpressRoute(new UpdateAlunoController));
routes.delete("/alunos/:id", adaptExpressRoute(new DeleteAlunoController));
routes.get("/alunos", adaptExpressRoute(new ListAlunoController));
routes.get("/alunos/:id", adaptExpressRoute(new ShowAlunoController));
routes.get("/alunos/search/:nome", adaptExpressRoute(new SearchAlunoByNameController));

// rotas para cursos
routes.post("/cursos", adaptExpressRoute(new CreateCursoContoller));
routes.put("/cursos/:id", adaptExpressRoute(new UpdateCursoController));
routes.get("/cursos", adaptExpressRoute(new ListCursosController));
routes.get("/cursos/sigla/:sigla", adaptExpressRoute(new SearchCursoBySiglaController));
routes.get("/cursos/nome/:nome", adaptExpressRoute(new SearchCursoByNomeController));


// rotas para turmas
routes.post("/turmas", adaptExpressRoute(new CreateTurmaContoller));
routes.put("/turmas/:id", adaptExpressRoute(new UpdateTurmaController));
routes.delete("/turmas/:id", adaptExpressRoute(new DeleteTurmaController));
routes.get("/turmas", adaptExpressRoute(new ListTurmasController));
routes.get("/turmas/search/ano/:ano", adaptExpressRoute(new SearchTurmaByAnoController));
routes.get("/turmas/search/semestre/:semestre", adaptExpressRoute(new SearchTurmaBySemestreController));
routes.patch("/turmas/curso/:turma", adaptExpressRoute(new LinkCourseClassController))
routes.patch("/turmas/alunos/:turma", adaptExpressRoute(new LinkStudentClassController));
routes.patch("/turmas/professor/:turma", adaptExpressRoute(new LinkTeacherClassController))

// rotas para professores
routes.post('/professor/', adaptExpressRoute(new CreateProfessorContoller));
routes.put('/professor/:id', adaptExpressRoute(new UpdateProfessorController));
routes.delete('/professor/:id', adaptExpressRoute(new DeleteProfessorController));
routes.get('/professor/', adaptExpressRoute(new ListProfessoresController));
routes.get('/professor/:id', adaptExpressRoute(new FindProfessorByIdController));
routes.get("/professores/search/nome/:nome", adaptExpressRoute(new SearchProfessorByNomeController));
routes.get("/professores/search/especialidade/:especialidade", adaptExpressRoute(new SearchProfessorByEspecialidadeController));


export { routes };

