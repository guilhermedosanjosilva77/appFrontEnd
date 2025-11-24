import React from 'react';
import { useParams } from 'react-router-dom';

function ListarProdutosPorCategoria({ produto }) { 
 
    const { categoriaId } = useParams();

    const targetId = parseInt(categoriaId); 

    
    const produtosFiltrados = produto.filter(item =>
        item.categoriaId === targetId 
    );
    return (
        <div className="lista-produtos-categoria">
            <h2>Produtos da Categoria ID: {targetId}</h2>
            {produtosFiltrados.length === 0 ? (
                <p>Nenhum produto cadastrado nesta categoria.</p>
            ) : (
                <ul>
                    {produtosFiltrados.map(p => (
                        <li key={p.id}>{p.nome}</li>
                        
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ListarProdutosPorCategoria;