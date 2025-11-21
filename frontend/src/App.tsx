import { Routes, Route } from "react-router-dom";
import ComoFunciona from "./pages/ComoFunciona";
import Sobre from "./pages/Sobre";
import Contato from "./pages/Contato";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Programacao from "./pages/Programacao"; // Importa a nova página
import { MagicThemeSwitcher } from "./components/ui/MagicThemeSwitcher";
import AppLayout from "./components/AppLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/programacao" element={<Programacao />} />{" "}
          {/* Nova Rota */}
          <Route path="/como-funciona" element={<ComoFunciona />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
        </Route>
      </Routes>

      <div className="fixed bottom-4 right-4 z-50">
        <MagicThemeSwitcher />
      </div>
    </>
  );
}

export default App;
