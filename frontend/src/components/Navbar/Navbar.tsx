import React from "react";
import { LogIn } from "lucide-react";
import "./index.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Detech</h1>

      <ul className="menu">
        <li>Como funciona</li>
        <li>Sobre nós</li>
        <li>Contatos</li>
      </ul>

      <button className="login">
        <LogIn size={18} />
        <p>Log in</p>
      </button>
    </nav>
  );
}