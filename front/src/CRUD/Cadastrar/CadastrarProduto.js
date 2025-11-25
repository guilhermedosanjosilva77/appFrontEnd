import { useEffect, useState } from "react";

export default function CadastroProduto({ produto, setProduto }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState(0);
  const [estoque, setEstoque] = useState(0);
  const [opcoes, setOpcoes] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [loading, setLoading] = useState(false);

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

      // 🔥 Adiciona o novo produto no estado global
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
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
            <option value="">Selecione</option>
            {opcoes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        )}

        <button type="submit">Salvar Produto</button>
      </form>
    </div>
  );
}
