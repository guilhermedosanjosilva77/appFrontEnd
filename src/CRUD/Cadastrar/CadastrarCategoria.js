import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cadastrocategoria({ categoria, setCategoria }) {
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    const ROTA_LISTA = "/listar";

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nome.trim() === "") {
            alert("O nome da categoria não pode ser vazio.");
            return;
        }

        const NewCategoria = { id: Date.now(), nome: nome.trim() };
      
        setCategoria([...categoria, NewCategoria]);
        setNome("");

       
    };

    const handleIrParaLista = () => {
        navigate(ROTA_LISTA);
    };

    return (
        <div className="cadastrar-categoria">
            <h2>Cadastrar Categoria</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nome da Categoria"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <button type="submit">Salvar</button>
            </form>

            <button onClick={handleIrParaLista}>
                Ver Categorias Cadastradas
            </button>
        </div>
    );
}

export default Cadastrocategoria;