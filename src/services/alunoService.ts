import knex from "../database/connection";

export const userService = {

  async create(nome: any, idade: any, endereco: any) {
    const user = {
      nome,
      idade,
      endereco,
    };

    const [createdUser] = await knex("alunos").insert(user).returning("*");
    return createdUser;
  },

  async update(id: any, nome: any, idade: any, endereco: any) {
    const user = {
      nome,
      idade,
      endereco,
    };
    const [updatedUser] = await knex("alunos")
      .where({ id: id })
      .update(user)
      .returning("*");
    return updatedUser;
  },

  async show(id: any) {
    const user = await knex("alunos").where({ id }).first();
    return user;
  },

  async remove(id: any) {
    const [deletedUser] = await knex("alunos")
      .where({ id })
      .del()
      .returning("*");
    return deletedUser;
  },

  async list() {
    const users = await knex("alunos").select("*");
    return users;
  },

  async searchByName(nome: any) {
    const users = await knex("alunos")
      .where("nome", "ilike", `%${nome}%`)
      .select("*");
    return users;
  },


  async linkStudentToClass(turmaId: number, aluno_id: number) {
    const turma = await knex("turmas").where({ id: turmaId }).first();
    const aluno = await knex("alunos").where({ id: aluno_id }).first();

    if (!aluno || !turma) {
      return false
    }

    const turmaUpdated = await knex("turmas").where({ id: turmaId }).update({
      aluno_id: aluno.id
    }).select("*")


    return turmaUpdated;

  }
};
