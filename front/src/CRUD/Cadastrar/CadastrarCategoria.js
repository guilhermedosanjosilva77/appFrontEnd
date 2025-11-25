import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastrarCategoria.css"

const API_CATEGORIAS_URL = "http://localhost:4567/categorias";

function CadastrarCategoria({ categoria, setCategoria }) {
    const [nome, setNome] = useState("");
    const [categoriaEmEdicao, setCategoriaEmEdicao] = useState(null);
    const navigate = useNavigate();

    // --- LÓGICA DE CARREGAMENTO (GET) ---

    useEffect(() => {
        carregarCategorias();
    }, []);

    const carregarCategorias = async () => {
        try {
            const response = await fetch(API_CATEGORIAS_URL);
            const data = await response.json();
            setCategoria(data);
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    };

    // --- FUNÇÃO POST (CADASTRO) ---

    const adicionaCategoria = async () => {
        try {
            const response = await fetch(API_CATEGORIAS_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: nome.trim() }),
            });

            if (!response.ok) throw new Error(`Status: ${response.status}`);

            const data = await response.json();
            setCategoria((prev) => [...(prev || []), data]);
            setNome("");
            alert(`Categoria '${data.nome}' cadastrada!`);
        } catch (error) {
            console.error("Erro POST:", error);
            alert(`Erro ao cadastrar. Verifique o servidor (${API_CATEGORIAS_URL}).`);
        }
    };

    // --- FUNÇÃO PUT (EDIÇÃO) ---

    const editarCategoria = async () => {
        if (!categoriaEmEdicao) return;
        const id = categoriaEmEdicao.id;

        try {
            const response = await fetch(`${API_CATEGORIAS_URL}/${id}`, {
                method: "PUT", // <-- MÉTODO PUT PARA ATUALIZAR
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    id: id,
                    nome: nome.trim() // Novo nome
                }),
            });

            if (!response.ok) throw new Error(`Status: ${response.status}`);

            const data = await response.json();
            
            // Atualiza a lista local com o item retornado pela API
            setCategoria((prev) =>
                prev.map((c) => (c.id === id ? data : c))
            );

            // Reseta para o modo de Cadastro
            setNome("");
            setCategoriaEmEdicao(null);
            alert(`Categoria ID ${id} atualizada!`);

        } catch (error) {
            console.error("Erro PUT:", error);
            alert(`Erro ao editar. Verifique o servidor.`);
        }
    };

    // --- FUNÇÃO DELETE (EXCLUSÃO) ---

    const deletarCategoria = async (id) => {
        if (!window.confirm("Confirmar exclusão?")) return;
        
        try {
            const response = await fetch(`${API_CATEGORIAS_URL}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok && response.status !== 204) throw new Error(`Status: ${response.status}`);
            
            setCategoria((prev) => prev.filter((c) => c.id !== id));
            alert(`Categoria ID ${id} deletada!`);

        } catch (error) {
            console.error("Erro DELETE:", error);
            alert(`Erro ao deletar.`);
        }
    };
    
    // --- HANDLERS ---
    
    // Inicia o modo de Edição, preenchendo o formulário
    const handleEditarClick = (categoria) => {
        setCategoriaEmEdicao(categoria);
        setNome(categoria.nome);
    };

    const handleCancelarEdicao = () => {
        setCategoriaEmEdicao(null);
        setNome("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nome.trim() === "") return alert("O nome não pode ser vazio.");
        
        // Decide se é POST (Cadastro) ou PUT (Edição)
        if (categoriaEmEdicao) {
            editarCategoria();
        } else {
            adicionaCategoria();
        }
    };

    return (
        <div className="gerenciar-categorias">
            <h2>{categoriaEmEdicao ? "✏️ Editar Categoria" : " Cadastrar Categoria"}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome da Categoria"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <button type="submit">
                    {categoriaEmEdicao ? "Salvar Edição" : "Salvar Cadastro"}
                </button>
                
                {categoriaEmEdicao && (
                    <button type="button" onClick={handleCancelarEdicao} style={{ marginLeft: '10px' }}>
                        Cancelar
                    </button>
                )}
            </form>

            <hr/>

            <h3>Lista de Categorias</h3>
            {categoria && categoria.length > 0 ? (
                <ul>
                    {categoria.map((c) => (
                        <li key={c.id}>
                            {c.nome} (ID: {c.id})
                            <button onClick={() => handleEditarClick(c)} style={{ margin: '0 10px' }}>
                                Editar
                            </button>
                            <button onClick={() => deletarCategoria(c.id)}>
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhuma categoria encontrada.</p>
            )}
            
            <button onClick={() => navigate("/listar")} style={{ marginTop: '20px' }}>
                Ir para Lista
            </button>
        </div>
    );
}

export default CadastrarCategoria;