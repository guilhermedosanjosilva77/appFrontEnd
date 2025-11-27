import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./ListarProdutoPorCategoria.css";

const API_PRODUTOS_URL = "http://localhost:4567/produtos"; 

// O componente DEVE receber 'produto' e 'setProduto'
function ListarProdutosPorCategoria({ produto, setProduto }) { 
    // Obtém o ID da categoria da URL e converte para número inteiro
    const { categoriaId } = useParams();
    const targetId = parseInt(categoriaId);

    // Estados para controlar a edição
    const [editarProdutoId, setEditarProdutoId] = useState(null);
    const [novoNomeProduto, setNovoNomeProduto] = useState("");

    // Filtra a lista de produtos pela categoriaId da URL
    const produtosFiltrados = produto.filter(item =>
        item.categoria?.id === targetId 
    );

    // --- FUNÇÕES DE CRUD ---

    const handleEditProduto = (p) => {
        setEditarProdutoId(p.id);
        setNovoNomeProduto(p.nome);
    };

    const deletarProduto = async (id) => {
        if (!window.confirm("Confirmar exclusão?")) return;

        try {
            const response = await fetch(`${API_PRODUTOS_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok && response.status !== 204)
                throw new Error(`Status: ${response.status}`);

            
            setProduto((prev) => prev.filter((p) => p.id !== id));
            alert(`Produto ID ${id} deletado!`);
        } catch (error) {
            console.error("Erro DELETE:", error);
            alert(`Erro ao deletar.`);
        }
    };
    
    const handleSaveProduto = async (id) => {
        const produtoOriginal = produto.find(p => p.id === id);

        // Envia o objeto completo no PUT, atualizando apenas o nome
        const dadosAtualizados = {
            ...produtoOriginal, 
            nome: novoNomeProduto, 
        };

        try {
            const response = await fetch(`${API_PRODUTOS_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosAtualizados), 
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: response.statusText }));
                throw new Error(`Erro: ${response.status} - ${errorData.message || response.statusText}`);
            }

           
            setProduto(
                produto.map((p) => (p.id === id ? dadosAtualizados : p))
            );
            alert(`Produto ID ${id} atualizado!`);

        } catch (error) {
            console.error("Erro UPDATE de Produto:", error);
            alert(`Erro ao salvar o produto: ${error.message}`);
        }

        setEditarProdutoId(null);
        setNovoNomeProduto("");
    };

    // --- RENDERIZAÇÃO ---
    return (
        <div className="lista-container">
            <h2 className="lista-title">Produtos da Categoria {targetId}</h2>

            {produtosFiltrados.length === 0 ? (
                <p className="lista-empty">Nenhum produto cadastrado nesta categoria.</p>
            ) : (
                <ul className="lista-ul">
                    {produtosFiltrados.map(p => (
                        <li key={p.id} className="lista-item">
                            
                            {/* Início do operador ternário */}
                            {editarProdutoId === p.id ? (
                                // Bloco de Edição
                                <>
                                    <input
                                        type="text"
                                        className="editing-input"
                                        value={novoNomeProduto}
                                        onChange={(e) => setNovoNomeProduto(e.target.value)}
                                    />
                                    <button onClick={() => handleSaveProduto(p.id)}>Salvar</button>
                                </>
                            ) : (
                                // Bloco de Visualização e Ações - Corrigido o erro JSX
                                <> 
                                    <span>{p.nome}</span>
                                    <button onClick={() => handleEditProduto(p)}>Editar</button>
                                    <button onClick={() => deletarProduto(p.id)}>Deletar</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListarProdutosPorCategoria;