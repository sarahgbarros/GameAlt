import { Routes, Route } from "react-router-dom";

// Componentes e Páginas
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
