import { Routes, Route } from "react-router-dom";

// Componentes e Páginas
import ComoFunciona from "./pages/ComoFunciona";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import { ThemeToggle } from "./components/ui/ThemeToggle";

function App() {
  return (
    <>
      <Routes>
        {/* --- ROTAS PÚBLICAS --- */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/como-funciona" element={<ComoFunciona />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/contato" element={<Contato />} />

        {/* --- ROTAS PRIVADAS (com layout) --- */}
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Route>
      </Routes>
      <ThemeToggle />
    </>
  );
}

export default App;
