import React, { useState } from "react";
import ListarCategoria from "./CRUD/Listar/ListarCategoria";
import Cadastrocategoria from "./CRUD/Cadastrar/CadastrarCategoria";
import ListarProdutosPorCategoria from "./CRUD/Listar/ListarProdutoPorCategoria";
import CadastroProduto from "./CRUD/Cadastrar/CadastrarProduto";
import Home from "./CRUD/Home";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  
  const [categoria, setCategoria] = useState([]);
  const [produto, setProduto] = useState([]);


  const navigate = useNavigate();

  
  function irParapage() {
    navigate("/cadastrar");
  }

  return (
    <div>
        
        
        <button onClick={irParapage} style={{ margin: '10px', padding: '10px' }}>
            Ir para Cadastro de Categoria
        </button>

      <Routes>
        
        <Route
          path="/listar"
          element={
            <ListarCategoria
              categoria={categoria}
              setCategoria={setCategoria}
            />
          }
        />
        
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
        
        <Route path="/" element={<Home />} />
        
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