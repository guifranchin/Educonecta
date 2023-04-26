import { Router } from "express";
import { cursosController } from "./controllers/cursosController";
import { alunoController } from "./controllers/alunoController";
import { turmaController } from "./controllers/turmaController";
import { professorController } from "./controllers/professorController";


const routes = Router();

// rotas para alunos
routes.post("/alunos", alunoController.create);
routes.put("/alunos/:id", alunoController.update);
routes.delete("/alunos/:id", alunoController.delete);
routes.get("/alunos", alunoController.list);
routes.get("/alunos/:id", alunoController.show);
routes.get("/alunos/search/:nome", alunoController.searchByName);

// rotas para cursos
routes.post("/cursos", cursosController.create);
routes.put("/cursos/:id", cursosController.update);
routes.delete("/cursos/:id", cursosController.delete);
routes.get("/cursos", cursosController.list);
routes.get("/cursos/sigla/:sigla", cursosController.findBySigla);
routes.get("/cursos/nome/:nome", cursosController.findByNome);

// rotas para turmas
routes.post("/turmas", turmaController.create);
routes.put("/turmas/:id", turmaController.update);
routes.delete("/turmas/:id", turmaController.delete);
routes.get("/turmas", turmaController.list);
routes.get("/turmas/search/ano/:ano", turmaController.searchTurmasByAno);
routes.get("/turmas/search/semestre/:semestre", turmaController.searchTurmasBySemestre);

// rotas para professores
routes.post('/professor/', professorController.create);
routes.put('/professor/:id', professorController.update);
routes.delete('/professor/:id', professorController.delete);
routes.get('/professor/', professorController.list);
routes.get('/professor/:id', professorController.findById);
routes.get("/professores/search/nome/:nome", professorController.findByNome);
routes.get("/professores/search/especialidade/:especialidade", professorController.findByEspecialidade);


export { routes };
