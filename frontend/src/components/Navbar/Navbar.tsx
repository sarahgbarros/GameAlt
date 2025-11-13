import { LogIn, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import "./index.css";

export default function Navbar({ setIsSidebarOpen }) {
  return (
    <nav className="navbar">
      {/* Menu Hamburguer */}
      <button className="hamburger" onClick={() => setIsSidebarOpen(true)}>
        <Menu size={26} color="white" />
      </button>

      {/* Logo */}
      <h1 className="logo">Detech</h1>

      {/* Menu Desktop */}
      <ul className="menu">
        <li>
          <Link to="/como-funciona">Como funciona</Link>
        </li>
        <li>
          <Link to="/sobre">Sobre nós</Link>
        </li>
        <li>
          <Link to="/contato">Contatos</Link>
        </li>
      </ul>

      {/* Botão Log In -> redireciona para /login */}
      <Link to="/login" className="login">
        <LogIn size={18} />
        <p>Log in</p>
      </Link>
    </nav>
  );
}
