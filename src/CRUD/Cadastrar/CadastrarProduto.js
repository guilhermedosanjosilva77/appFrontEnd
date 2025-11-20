import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

function Cadastro({ produto, setProduto }) {
    const { categoriaId } = useParams();
    const navigate = useNavigate(); 

    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("");
    const [estoque, setEstoque] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!nome || !preco || !estoque) {
            alert("Preencha todos os campos!");
            return;
        }

        const targetCategoriaId = parseInt(categoriaId, 10);

        
        const newProduto = {
            id: Date.now(), 
            nome, 
            preco: parseFloat(preco), 
            estoque: parseInt(estoque, 10), 
            categoriaId: targetCategoriaId 
        };

        setProduto([...produto, newProduto]);
        
        setNome("");
        setPreco("");
        setEstoque("");

        navigate(`/produtos/${categoriaId}`);
    }

    return (
        <div className="cadastro">
            
            <h2>Cadastrar Produto na Categoria ID: {categoriaId}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <input 
                    type="number"
                    placeholder="Preço:"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                />
                
                <input
                    type="number"
                    placeholder="Estoque"
                    value={estoque} 
                    onChange={(e) => setEstoque(e.target.value)}
                />

                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}
export default Cadastro;