import { useNavigate } from "react-router-dom";
import "./Home.css";
function Home() {
  const navigate = useNavigate();

  function irParapage() {
    navigate("/cadastrar");
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Sistema de Gerenciamento</h1>
      <button onClick={irParapage} className="home-button">
        Cadastrar Categoria
      </button>
    </div>
  );
}

export default Home;
