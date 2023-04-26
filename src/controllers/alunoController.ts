import { userService } from "../services/alunoService";
export const alunoController = {
  async create(request: any, response: any) {
    const { nome, idade, endereco } = request.body;

    const createdUser = await userService.create(nome, idade, endereco);

    return response.status(201).json(createdUser);
  },

  async list(request: any, response: any) {
    try {
      const users = await userService.list();

      return response.json(users);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async show(request: any, response: any) {
    try {
      const { id } = request.params;

      const user = await userService.show(id);

      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.json(user);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async update(request: any, response: any) {
    try {
      const { id } = request.params;
      const { nome, idade, endereco } = request.body;

      const updatedUser = await userService.update(id, nome, idade, endereco);

      if (!updatedUser) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.json(updatedUser);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async delete(request: any, response: any) {
    try {
      const { id } = request.params;

      const deletedUser = await userService.remove(id);

      if (!deletedUser) {
        return response.status(404).json({ error: "User not found" });
      }

      return response.json(deletedUser);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  },

  async searchByName(request: any, response: any) {
    try {
      const { nome } = request.params;

      const users = await userService.searchByName(nome);

      return response.json(users);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  },
};
