import { turmaService } from "../services/turmaService";

export const turmaController = {
  async create(request: any, response: any) {
    const { ano, semestre } = request.body;

    try {
      const createdTurma = await turmaService.create(
        ano,
        semestre
      );
      return response.status(201).json(createdTurma);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  async update(request: any, response: any) {
    const { id } = request.params;
    const { ano, semestre, cursoId, professorId } = request.body;

    try {
      const updatedTurma = await turmaService.update(
        Number(id),
        ano,
        semestre,
        cursoId,
        professorId
      );

      if (updatedTurma) {
        return response.json(updatedTurma);
      } else {
        return response.status(404).json({ message: "Turma not found" });
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  async delete(request: any, response: any) {
    const { id } = request.params;

    try {
      const deletedTurma = await turmaService.delete(Number(id));

      if (deletedTurma) {
        return response.json(deletedTurma);
      } else {
        return response.status(404).json({ message: "Turma not found" });
      }
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  async list(request: any, response: any) {
    try {
      const turmas = await turmaService.list();
      return response.json(turmas);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  async searchTurmasBySemestre(req: any, res: any) {
    const { semestre } = req.params;
    try {
      const turmas = await turmaService.findBySemester(semestre);

      res.json(turmas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar turmas por semestre" });
    }
  },

  async searchTurmasByAno(req: any, res: any) {
    try {
      const turmas = await turmaService.findByYear(req.params.ano);

      res.json(turmas);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar turmas por ano" });
    }
  },
};
