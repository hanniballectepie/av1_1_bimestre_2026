import express from "express";
import { 
  listarTarefas, 
  criarTarefa, 
  atualizarTarefa, 
  excluirTarefa 
} from "./tarefas.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Olá mundo! A API de tarefas está rodando.");
});

app.get("/tarefas", (req, res) => {
  const lista = listarTarefas();
  res.status(200).json(lista);
});

app.post("/tarefas", (req, res) => {
  const { descricao } = req.body;
  
  if (!descricao) {
    return res.status(400).json({ erro: "A descrição é obrigatória!" });
  }

  const novaTarefa = criarTarefa(descricao);
  res.status(201).json(novaTarefa);
});

app.put("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { descricao, concluida } = req.body;

  const tarefaAtualizada = atualizarTarefa(id, descricao, concluida);

  if (!tarefaAtualizada) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  res.status(200).json(tarefaAtualizada);
});

app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const tarefaRemovida = excluirTarefa(id);

  if (!tarefaRemovida) {
    return res.status(404).json({ erro: "Tarefa não encontrada." });
  }

  res.status(200).json({ 
    mensagem: "Tarefa removida com sucesso!", 
    tarefa: tarefaRemovida 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});