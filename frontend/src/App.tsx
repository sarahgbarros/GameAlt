import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";

function App() {
  return (
    <Routes>
      {/* ROTAS PÚBLICAS: */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* ROTAS PRIVADAS: */}
      <Route element={<AppLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/home" element={<Navigate to="/home" />} />
      </Route>
    </Routes>
  );
}

export default App;
