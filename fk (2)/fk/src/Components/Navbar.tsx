import { NavLink, useNavigate } from "react-router-dom";
import { useTokenDispatch } from "../Providers/token.context";
import { TypeToken } from "../Hooks/token.hook";

export default function Navbar() {

  const tokenDispatch = useTokenDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    tokenDispatch({ type: TypeToken.guardar, payload: "" });
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">

        {/* LOGO */}
        <a className="navbar-brand" href="#">
          <img
            src="/images/navbar_1.png"
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />{" "}
          Clinica
        </a>

        {/* TOGGLER MOVIL */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* CONTENIDO */}
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">

          {/* IZQUIERDA */}
          <ul className="navbar-nav">

            {/* INICIO */}
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/main">
                Inicio
              </NavLink>
            </li>

            {/* MENÚ USUARIOS */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Usuarios
              </a>

              <ul className="dropdown-menu">

                {/* PACIENTES */}
                <li>
                  <NavLink className="dropdown-item" to="usuarios/pacientes">
                    <i className="fa-solid fa-bed me-2"></i>
                    Pacientes
                  </NavLink>
                </li>

                {/* ⭐ MÓDULO CITAS (nuevo) */}
                <li>
                  <NavLink className="dropdown-item" to="citas">
                    <i className="fa-solid fa-calendar-check me-2"></i>
                    Citas
                  </NavLink>
                </li>

                {/* DOCTORES */}
                <li>
                  <NavLink className="dropdown-item" to="usuarios/doctores">
                    <i className="fa-solid fa-user-doctor-hair me-2"></i>
                    Doctores
                  </NavLink>
                </li>

                {/* REGISTRO (como lo tenías tú) */}
                <li>
                  <NavLink className="dropdown-item" to="usuarios/registro">
                    Registrar
                  </NavLink>
                </li>

                {/* CONSULTORIOS */}
                <li>
                  <NavLink className="dropdown-item" to="consultorios">
                    <i className="fa-solid fa-hospital-user me-2"></i>
                    Consultorios
                  </NavLink>
                </li>

              </ul>
            </li>
          </ul>

          {/* DERECHA - SALIR */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={handleSignOut}>
                <i className="fa-light fa-right-from-bracket"></i> salir
              </a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}
