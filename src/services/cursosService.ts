import knex from "../database/connection";

export const cursosService = {
  async create(nome: string, sigla: string) {
    const curso = {
      nome,
      sigla,
    };

    const [createdCurso] = await knex("cursos").insert(curso).returning("*");
    return createdCurso;
  },

  async update(id: number, nome: string, sigla: string) {
    const curso = {
      nome,
      sigla,
    };

    const updatedCurso = await knex("cursos")
      .where("id", id)
      .update(curso)
      .returning("*");
    return updatedCurso;
  },

  async delete(id: number) {
    const deletedCurso = await knex("cursos")
      .where("id", id)
      .delete()
      .returning("*");
    return deletedCurso;
  },

  async list() {
    const cursos = await knex("cursos").select("*");
    return cursos;
  },

  async findBySigla(sigla: string) {
    const curso = await knex("cursos").where("sigla", sigla).first();
    return curso;
  },

  async findByNome(nome: string) {
    const curso = await knex("cursos")
      .where("nome", "ilike", `%${nome}%`)
      .first();
    return curso;
  },

  async linkCourseToClass(turmaId: number, cursoid: number) {
    const turma = await knex("turmas").where({ id: turmaId }).first();
    const curso = await knex("cursos").where({ id: cursoid }).first();

    if (!curso || !turma) {
      return false
    }

    const turmaUpdated = await knex("turmas").where({ id: turmaId }).update({
      curso_id: curso.id
    }).select("*")


    return turmaUpdated;

  },

  async listaTeacherByCursoAndTurma(
    cursoId: number,
    turmaAno: any,
    turmaSemestre: any
  ) {
    const query = `
      SELECT p.id, p.nome
      FROM professores p
      INNER JOIN turmas t ON t.professor_id  = p.id
      INNER JOIN cursos c ON t.curso_id = c.id
      WHERE c.id = ? AND t.ano = ? AND t.semestre = ?
      `;
    const result = await knex.raw(query, [cursoId, turmaAno, turmaSemestre]);
    return result.rows;
  },

  async listStudentsByCursoAndTurma(
    cursoId: number,
    turmaAno: any,
    turmaSemestre: any
  ) {
      const query = `
      SELECT a.id, a.nome
      FROM alunos a
      INNER JOIN turmas t ON t.id = a.id
      INNER JOIN cursos c ON c.id = t.curso_id
      WHERE c.id = ? AND t.ano = ? AND t.semestre = ?
    `;
      const result = await knex.raw(query, [cursoId, turmaAno, turmaSemestre]);
      return result.rows;
  },
};
