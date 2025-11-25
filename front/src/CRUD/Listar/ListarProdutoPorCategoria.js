import React from 'react';
import { useParams } from 'react-router-dom';
import "./ListarProdutoPorCategoria.css";

function ListarProdutosPorCategoria({ produto }) { 
    const { categoriaId } = useParams();
    const targetId = parseInt(categoriaId);

    const produtosFiltrados = produto.filter(item =>
        item.categoria?.id === targetId
    );

    return (
        <div className="lista-container">
            <h2 className="lista-title">Produtos da Categoria {targetId}</h2>

            {produtosFiltrados.length === 0 ? (
                <p className="lista-empty">Nenhum produto cadastrado nesta categoria.</p>
            ) : (
                <ul className="lista-ul">
                    {produtosFiltrados.map(p => (
                        <li key={p.id} className="lista-item">
                            {p.nome}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListarProdutosPorCategoria;
