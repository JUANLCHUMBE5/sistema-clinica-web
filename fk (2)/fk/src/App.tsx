import { Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import Home from "./views/Home";

import Layout from "./views/Layout";
import Principal from "./views/Principal";

import Usuarios from "./views/Usuarios/Usuarios";
import Pacientes from "./views/Usuarios/Pacientes";
import Doctores from "./views/Usuarios/Doctores";
import Registro from "./views/Usuarios/Registro";
import RouterProtect from "./Components/RouterProtect"; // <-- sigue importado, aunque no se use
import Consultorios from "./views/Consultorios/Consultorios";

// MÓDULO CITAS
import Citas from "./views/Citas/Citas";
import CitasPaciente from "./views/Citas/CitasPaciente";

function App() {
  return (
    <Fragment>
      <Routes>

        {/* LOGIN */}
        <Route index element={<Home />} />

        {/* MAIN */}
        <Route path="main" element={<Layout />}>

          {/* INICIO / DASHBOARD */}
          <Route index element={<Principal />} />

          {/* USUARIOS */}
          <Route path="usuarios" element={<Usuarios />}>

            {/* PACIENTES */}
            <Route path="pacientes" element={<Pacientes />} />

            {/* DOCTORES */}
            <Route path="doctores" element={<Doctores />} />

            {/* REGISTRO PACIENTE / DOCTOR */}
            <Route path=":tipoUsuario/registro" element={<Registro />} />

          </Route>

          {/* ⭐ MÓDULO GENERAL DE CITAS */}
          <Route path="citas" element={<Citas />} />

          {/* ⭐ CITAS DE UN PACIENTE ESPECÍFICO */}
          <Route
            path="usuarios/pacientes/:pacienteId/citas"
            element={<CitasPaciente />}
          />

          {/* CONSULTORIOS */}
          <Route path="consultorios" element={<Consultorios />} />
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
