import React from "react";
import logo from "../assets/logo.png";
import "../estilos/Header.css";

export default function Header() {
  return (
    <header className="header-contenedor">
      <img src={logo} alt="Logo de tuSanatorio" className="header-logo" />
    </header>
  );
}
