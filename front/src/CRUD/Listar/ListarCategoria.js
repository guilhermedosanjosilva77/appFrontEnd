import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_CATEGORIAS_URL = "http://localhost:4567/categorias";

function ListarCategoria({ categoria, setCategoria }) {
  const navigate = useNavigate();

  const [editarId, setEditarId] = useState("");
  const [newNome, setNewNome] = useState("");

  // FUNÇÃO ATUALIZADA: Agora envia a alteração para a API
  const handleSave = async (id) => {
    try {
      const response = await fetch(`${API_CATEGORIAS_URL}/${id}`, {
        method: "PUT", // Usando PUT para atualizar o recurso completo
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: newNome }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }

      // Atualiza o estado local apenas se a API retornar sucesso
      setCategoria(
        categoria.map((c) => (c.id === id ? { ...c, nome: newNome } : c))
      );
      alert(`Categoria ID ${id} atualizada!`);
    } catch (error) {
      console.error("Erro UPDATE:", error);
      alert(`Erro ao salvar a categoria.`);
    }

    // Fecha o modo de edição
    setEditarId("");
    setNewNome("");
  };

  const deletarCategoria = async (id) => {
    if (!window.confirm("Confirmar exclusão?")) return;

    try {
      const response = await fetch(`${API_CATEGORIAS_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok && response.status !== 204)
        throw new Error(`Status: ${response.status}`);

      setCategoria((prev) => prev.filter((c) => c.id !== id));
      alert(`Categoria ID ${id} deletada!`);
    } catch (error) {
      console.error("Erro DELETE:", error);
      alert(`Erro ao deletar.`);
    }
  };

  // FUNÇÃO handleEdit: Permanece correta, apenas habilita o input
  const handleEdit = (item) => {
    setEditarId(item.id);
    setNewNome(item.nome);
  };

  const handleIrParaCadastro = () => {
    navigate(`/cadastrarProduto`);// Ajustado para ir para o cadastro geral
  };

  const handleIrParaListaProdutos = (categoriaId) => {
    navigate(`/produtos/${categoriaId}`);
  };

  return (
    <div className="Listarcategoria">
      <h2>Categorias Cadastradas</h2>

      {categoria.length === 0 ? (
        <p>Nenhum item cadastrado</p>
      ) : (
        <ul>
          {categoria.map((item) => (
            <li key={item.id}>
              {editarId === item.id ? (
                <>
                  <input
                    type="text"
                    value={newNome}
                    onChange={(e) => setNewNome(e.target.value)}
                  />
                  {/* Chama a nova função async handleSave */}
                  <button onClick={() => handleSave(item.id)}>Salvar</button>
                </>
              ) : (
                <>
                  <span>{item.nome}</span>

                  <button onClick={() => handleEdit(item)}>Editar</button>

                  <button onClick={() => deletarCategoria(item.id)}>
                    Deletar
                  </button>

                  <button onClick={() => handleIrParaListaProdutos(item.id)}>
                    Listar Produtos
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleIrParaCadastro}>Ir para cadastro</button>
    </div>
  );
}

export default ListarCategoria;
