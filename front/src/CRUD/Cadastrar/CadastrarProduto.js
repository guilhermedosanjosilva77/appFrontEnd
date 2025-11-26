import { useEffect, useState } from "react";
// 1. IMPORTAR 'useNavigate' AQUI
import { useNavigate } from "react-router-dom"; 

export default function CadastroProduto({ produto, setProduto }) {
  // 2. DECLARAR A FUNÇÃO 'navigate' AQUI
  const navigate = useNavigate(); 

  function irParapage() {
    navigate("/listar");
  }
  
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(0);
  const [opcoes, setOpcoes] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [loading, setLoading] = useState(false);

  // ... (carregarCategorias, useEffect, adicionaProduto, handleSubmit - códigos omitidos)

  async function carregarCategorias() {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4567/categorias");
      const data = await response.json();
      setOpcoes(data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarCategorias();
  }, []);

  const adicionaProduto = async () => {
    try {
      const response = await fetch("http://localhost:4567/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          preco,
          estoque,
          categoria: categoriaId ? { id: categoriaId } : null,
        }),
      });

      const data = await response.json();
      console.log("Produto criado →", data);

      
      setProduto((prev) => [...prev, data]);

      // Limpar campos
      setNome("");
      setPreco(0);
      setEstoque(0);
      setCategoriaId("");
    } catch (error) {
      console.error("Erro ao criar produto", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    adicionaProduto();
  };


  return (
    <div className="container">
      <h2>Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        {/* ... (Inputs) ... */}
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Notebook..."
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <label>Preço:</label>
        <input
          type="number"
          value={preco}
          placeholder="1599.90"
          onChange={(e) => setPreco(e.target.value)}
        />

        <label>Estoque:</label>
        <input
          type="number"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />

        <label>Categoria:</label>
        {loading ? (
          <p>Carregando categorias...</p>
        ) : (
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
          >
            <option value="">Selecione</option>
            {opcoes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        )}

        <button type="submit" onClick={irParapage}>Salvar Produto</button>
        
        {/* 3. CORREÇÃO: Usar o caminho da rota (ex: /produtos) e envolver o navigate em uma função anônima */}
        {/* Assumindo que a rota para ListarProdutoPorCategoria é '/produtos' ou '/listagem' */}
    
      </form>
    </div>
  );
}