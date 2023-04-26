exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('alunos', function(table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.integer('idade').notNullable();
      table.string('endereco').notNullable();
    }),

    knex.schema.createTable('turmas', function(table) {
      table.increments('id').primary();
      table.string('semestre').notNullable();
      table.integer('ano').notNullable();
      table.integer('curso_id').unsigned();
      table.foreign('curso_id').references('cursos.id').onDelete('SET NULL');
      table.integer('professor_id').unsigned();
      table.foreign('professor_id').references('professores.id').onDelete('SET NULL');
    }),

    knex.schema.createTable('cursos', function(table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('sigla').notNullable();
    }),

    knex.schema.createTable('professores', function(table) {
      table.increments('id').primary();
      table.string('nome').notNullable();
      table.string('endereco').notNullable();
      table.string('especialidade').notNullable();
    }),

    knex.schema.createTable('alunos_turmas', function(table) {
      table.integer('aluno_id').unsigned();
      table.foreign('aluno_id').references('alunos.id').onDelete('CASCADE');
      table.integer('turma_id').unsigned();
      table.foreign('turma_id').references('turmas.id').onDelete('CASCADE');
      table.primary(['aluno_id', 'turma_id']);
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('alunos_turmas'),
    knex.schema.dropTable('professores'),
    knex.schema.dropTable('cursos'),
    knex.schema.dropTable('turmas'),
    knex.schema.dropTable('alunos')
  ]);
};