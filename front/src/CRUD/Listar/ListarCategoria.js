import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function ListarCategoria({ categoria, setCategoria, produto, setProduto }) {
  const navigate = useNavigate(); 
  
  const [editarId, setEditarId] = useState("");
  const [newNome, setNewNome] = useState("");


  const handleSave = (id) => {
    setCategoria(
      categoria.map((c) => (c.id === id ? { ...c, nome: newNome } : c))
    );
    setEditarId(""); 
    setNewNome("");
  };

  const handleEdit = (item) => {
    setEditarId(item.id);
    setNewNome(item.nome);
  };

  const handleDelete = (id) => {
    setCategoria(categoria.filter((c) => c.id !== id));
  };

  
  const handleIrParaCadastro = (categoriaId) => {
    navigate(`/cadastrarProduto/${categoriaId}`); 
  }
  
  const handleIrParaListaProdutos = (categoriaId) => {
      navigate(`/produtos/${categoriaId}`);
  }
  
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
                  <button onClick={() => handleSave(item.id)}>Salvar</button>
                </>
              ) : (
                <>
                  <span>{item.nome}</span>

                  <button onClick={() => handleEdit(item)}>Editar</button>

                  <button onClick={() => handleDelete(item.id)}>Deletar</button>

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