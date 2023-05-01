import knex from "../database/connection";

export const professorService = {
  async create(nome: string, endereco: string, especialidade: string) {
    const professor = {
      nome,
      endereco,
      especialidade,
    };

    console.log(professor);

    const [createdProfessor] = await knex("professores")
      .insert(professor)
      .returning("*");
    return createdProfessor;
  },

  async update(id: number, nome: string, email: string, especialidade: string) {
    const professor = {
      nome,
      email,
      especialidade,
    };

    const updatedProfessor = await knex("professores")
      .where("id", id)
      .update(professor)
      .returning("*");
    return updatedProfessor;
  },

  async delete(id: number) {
    const deletedProfessor = await knex("professores")
      .where("id", id)
      .delete()
      .returning("*");
    return deletedProfessor;
  },

  async list() {
    const professores = await knex("professores").select("*");
    return professores;
  },

  async findById(id: number) {
    const professor = await knex("professores").where("id", id).first();
    return professor;
  },

  async findByNome(nome: string) {
    const professores = await knex("professores")
      .where("nome", "ilike", `%${nome}%`)
      .select("*");
    return professores;
  },

  async findByEspecialidade(especialidade: string) {
    const professores = await knex("professores")
      .where("especialidade", "ilike", `%${especialidade}%`)
      .select("*");
    return professores;
  },
};

