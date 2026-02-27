const tarefas = [
  { id: 1, descricao: "Estudar química", concluida: false },
  { id: 2, descricao: "Criar páginas no Figma", concluida: true }
];

export function encontrarTarefaId(id) {
  for (let i = 0; i < tarefas.length; i++) {
    if (tarefas[i].id === id) {
      return i;
    }
  }
  return -1;
}

export function listarTarefas() {
  return tarefas; 
}

export function criarTarefa(descricao) {
  const novaTarefa = {
    id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
    descricao: descricao,
    concluida: false
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

export function atualizarTarefa(id, novaDescricao, novoStatus) {
  const indiceEncontrado = encontrarTarefaId(id);

  if (indiceEncontrado === -1) {
    return null;
  }

  const tarefa = tarefas[indiceEncontrado];

  if (novaDescricao !== undefined && novaDescricao.trim() !== "") {
    tarefa.descricao = novaDescricao;
  }

  if (novoStatus !== undefined) {
    tarefa.concluida = novoStatus;
  }

  return tarefa;
}

export function excluirTarefa(id) {
  const indiceEncontrado = encontrarTarefaId(id);

  if (indiceEncontrado === -1) {
    return null;
  }

  const tarefaRemovida = tarefas.splice(indiceEncontrado, 1)[0]; 
  return tarefaRemovida;
}