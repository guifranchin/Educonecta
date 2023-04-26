import knex from "../database/connection";

export const turmaService = {
  async create(ano: number, semestre: string) {
    const turma = {
      ano,
      semestre,
    };

    const [createdTurma] = await knex("turmas").insert(turma).returning("*");
    return createdTurma;
  },

  async update(
    id: number,
    ano: number,
    semestre: string,
    cursoId: number,
    professorId: number
  ) {
    const turma = {
      ano,
      semestre,
      curso_id: cursoId,
      professor_id: professorId,
    };

    const updatedTurma = await knex("turmas")
      .where("id", id)
      .update(turma)
      .returning("*");
    return updatedTurma;
  },

  async delete(id: number) {
    const deletedTurma = await knex("turmas")
      .where("id", id)
      .delete()
      .returning("*");
    return deletedTurma;
  },

  async list() {
    const turmas = await knex("turmas").select("*");
    return turmas;
  },

  async findBySemester(semestre: string) {
    const turmas = await knex("turmas").where("semestre", semestre);
    return turmas;
  },

  async findByYear(ano: number) {
    const turmas = await knex("turmas").where("ano", ano);
    return turmas;
  },
};
