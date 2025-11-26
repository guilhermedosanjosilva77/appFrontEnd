import React, { useState } from "react";
import ListarCategoria from "./CRUD/Listar/ListarCategoria";
import Cadastrocategoria from "./CRUD/Cadastrar/CadastrarCategoria";
import ListarProdutosPorCategoria from "./CRUD/Listar/ListarProdutoPorCategoria";
import CadastroProduto from "./CRUD/Cadastrar/CadastrarProduto";
import Home from "./CRUD/Home";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  // Inicialização correta dos estados
  const [categoria, setCategoria] = useState([]);
  const [produto, setProduto] = useState([]);

  const navigate = useNavigate();

  // 🔑 Função que navega para a página de Cadastro de Categoria
  function irParapage() {
    navigate("/cadastrar");
  }

  return (
    <div>
        
        {/* 🔑 CORREÇÃO: Adicionando um botão para chamar a função irParapage */}
        <button onClick={irParapage} style={{ margin: '10px', padding: '10px' }}>
            Ir para Cadastro de Categoria
        </button>

      <Routes>
        {/* Rota para Listar Categorias */}
        <Route
          path="/listar"
          element={
            <ListarCategoria
              categoria={categoria}
              setCategoria={setCategoria}
            />
          }
        />
        {/* Rota para Cadastrar Categoria */}
        <Route
          path="/cadastrar"
          element={
            <Cadastrocategoria
              categoria={categoria}
              setCategoria={setCategoria}
            />
          }
        />
        <Route
          path="/cadastrarProduto"
          element={
            <CadastroProduto
              produto={produto}
              setProduto={setProduto}
              categoria={categoria}
            />
          }
        />
        {/* Rota Home */}
        <Route path="/" element={<Home />} />
        {/* Rota para Listar Produtos por Categoria */}
        <Route
          path="/produtos/:categoriaId"
          element={
            <ListarProdutosPorCategoria
              produto={produto}
              setProduto={setProduto}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;