import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function ListarProduto({ produto, setProduto }) {
  const navigate = useNavigate(); 
  
  const [editarId, setEditarId] = useState("");
  const [newNome, setNewNome] = useState("");
  const [newPreco, setNewPreco] = useState("");
  const [newEStoque, setNewEstoque] = useState("");


  const handleSave = (id) => {
    setProduto(
      produto.map((c) => (c.id === id ? { ...c, nome: newNome, preco:newPreco,estoque:newEStoque } : c))
    );
    setEditarId(""); 
    setNewNome("");
    setNewEstoque("")
    setNewPreco("")
  };

  const handleEdit = (item) => {
    setEditarId(item.id);
    setNewNome(item.nome);
    setNewPreco(item.preco)
    setNewEstoque(item.estoque)
  };

  const handleDelete = (id) => {
    setProduto(produto.filter((c) => c.id !== id));
  };
  
  return (
    <div className="Listarcategoria">
      <h2>Produtos Cadastrados</h2>

      {categoria.length === 0 ? (
        <p>Nenhum item cadastrado</p>
      ) : (
        <ul>
          {produto.map((item) => (
            <li key={item.id}>
              {editarId === item.id ? (
                <>
                  <input
                    type="text"
                    value={newNome}
                    onChange={(e) => setNewNome(e.target.value)}
                  />
                    <input
                    type="number"
                    value={newPreco}
                    onChange={(e) => setNewPreco(e.target.value)}
                  />
                    <input
                    type="number"
                    value={newEStoque}
                    onChange={(e) => setNewEstoque(e.target.value)}
                  />
                  <button onClick={() => handleSave(item.id)}>Salvar</button>
                </>
              ) : (
                <>
                  <span>{item.nome}</span>

                  <button onClick={() => handleEdit(item)}>Editar</button>

                  <button onClick={() => handleDelete(item.id)}>Deletar</button>

                
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListarCategoria;