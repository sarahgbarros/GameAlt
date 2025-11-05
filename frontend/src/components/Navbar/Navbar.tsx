
import { LogIn } from "lucide-react";
import "./index.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Detech</h1>

      <ul className="menu">
        <li><a href="#">Como funciona</a></li>
        <li><a href="#">Sobre nós</a></li>
        <li><a href="#">Contatos</a></li>
      </ul>

      <button className="login">
        <LogIn size={18} />
        <p>Log in</p>
      </button>
    </nav>
  );
}