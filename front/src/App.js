import React, { useState } from "react";
import ListarCategoria from "./CRUD/Listar/ListarCategoria";
import Cadastrocategoria from "./CRUD/Cadastrar/CadastrarCategoria";
import ListarProdutosPorCategoria from "./CRUD/Listar/ListarProdutoPorCategoria";
import CadastroProduto from "./CRUD/Cadastrar/CadastrarProduto"; 
import { Route, Routes, useNavigate } from "react-router-dom"; 

function App() {
  const [categoria, setCategoria] = useState([]);
  const [produto, setProduto] = useState([]);
  const [allProducts,categoriaId] = useState([])


  const navigate = useNavigate();

  function irParapage() {
    navigate("/cadastrar"); 
  }

  return (
    <div>
     
      <button onClick={irParapage}>Cadastrar Categoria</button>
      
     

      <Routes>
        <Route
          path="/listar"
          element={
            <ListarCategoria 
              categoria={categoria} 
              setCategoria={setCategoria} 
              produto={produto} 
              setProduto={setProduto} 
            />
          }
        />
        
        <Route
          path="/cadastrar"
          element={<Cadastrocategoria categoria={categoria} setCategoria={setCategoria} />}
        />


        <Route
          path="/cadastrarProduto/:categoriaId" 
          element={<CadastroProduto produto={produto} setProduto={setProduto}/>}
        />

        <Route
         path="/"
         element={<ListarCategoria categoria={categoria} setCategoria={setCategoria} />} />

         <Route
         path="/produtos/:categoriaId"
         element={<ListarProdutosPorCategoria produto={produto}/>}
         
         />

      </Routes>
    </div>
  );
}

export default App;