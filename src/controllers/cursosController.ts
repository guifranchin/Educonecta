import { cursosService } from "../services/cursosService";

export const cursosController = {
  async create(req: any, res: any) {
    const { nome, sigla } = req.body;
    const createdCurso = await cursosService.create(nome, sigla);
    res.json(createdCurso);
  },

  async update(req: any, res: any) {
    const { id } = req.params;
    const { nome, sigla } = req.body;
    const updatedCurso = await cursosService.update(
      parseInt(id),
      nome,
      sigla
    );
    res.json(updatedCurso);
  },

  async delete(req: any, res: any) {
    const { id } = req.params;
    const deletedCurso = await cursosService.delete(parseInt(id));
    res.json(deletedCurso);
  },

  async list(req: any, res: any) {
    const cursos = await cursosService.list();
    res.json(cursos);
  },

  async findBySigla(req: any, res: any) {
    const { sigla } = req.params;
    try {
      const curso = await cursosService.findBySigla(sigla);
      return res.status(200).json(curso);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro ao buscar curso por sigla.' });
    }
  },

  async findByNome(req: any, res: any) {
    const { nome } = req.params;
    try {
      const cursos = await cursosService.findByNome(nome);
      return res.status(200).json(cursos);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Erro ao buscar curso por nome.' });
    }
  }

};
