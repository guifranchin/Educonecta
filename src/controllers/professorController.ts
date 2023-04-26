import professorService from "../services/professorService";

export const professorController = {
  async create(req: any, res: any): Promise<Response> {
    const { nome, endereco, especialidade } = req.body;

    try {
      const createdProfessor = await professorService.create(
        nome,
        endereco,
        especialidade
      );
      return res.status(201).json(createdProfessor);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao cadastrar professor." });
    }
  },

  async update(req: any, res: any): Promise<Response> {
    const { id } = req.params;
    const { nome, email, especialidade } = req.body;

    try {
      const updatedProfessor = await professorService.update(
        Number(id),
        nome,
        email,
        especialidade
      );
      return res.status(200).json(updatedProfessor);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao atualizar professor." });
    }
  },

  async delete(req: any, res: any): Promise<Response> {
    const { id } = req.params;

    try {
      const deletedProfessor = await professorService.delete(Number(id));
      return res.status(200).json(deletedProfessor);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao deletar professor." });
    }
  },

  async list(req: any, res: any): Promise<Response> {
    try {
      const professores = await professorService.list();
      return res.status(200).json(professores);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao listar professores." });
    }
  },

  async findById(req: any, res: any): Promise<Response> {
    const { id } = req.params;

    try {
      const professor = await professorService.findById(Number(id));
      if (!professor) {
        return res.status(404).json({ message: "Prefesso não encontrado." });
      }
      return res.status(200).json(professor);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao listar professores." });
    }
  },

  async findByNome(req: any, res: any) {
    try {
      const nome = req.params.nome;
      const professores = await professorService.findByNome(nome);
      res.json(professores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar professores por nome.' });
    }
  },

  async findByEspecialidade(req: any, res: any) {
    try {
      const especialidade = req.params.especialidade;
      const professores = await professorService.findByEspecialidade(especialidade);
      res.json(professores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao buscar professores por especialidade.' });
    }
  },
};
