import React from "react";
import "../estilos/Inicio.css";

export default function Inicio() {
  return (
    <div className="inicio-contenedor">
      <h1 className="inicio-titulo">Bienvenido a tuSanatorio</h1>
      <p className="inicio-subtitulo">
        Tu centro médico en línea
      </p>
      <button className="inicio-boton">Acceder</button>
    </div>
  );
}
