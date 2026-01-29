import React, { useEffect } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Outlet, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import { useTokenDispatch, useTokenValue } from "../Providers/token.context";
import { TypeToken } from "../Hooks/token.hook";

import io from "socket.io-client";
import type { IHook } from "../models/Hook.model";
import { toast, ToastContainer } from "react-toastify";
import { toastConfig } from "../configs/valueDefault";

const socket = io();

export default function Layout(): React.ReactElement {
  const navigate = useNavigate();
  const tokenDispatch = useTokenDispatch();

  const tokenValue: IHook = useTokenValue();

  // Escuchar mensajes de socket
  useEffect(() => {
    const frm = () => {
      socket.on("message", () => {
        toast.info("usuario conectado", toastConfig.info);
      });
    };

    frm();
  }, []);

  // Emitir mensaje cuando haya token
  useEffect(() => {
    const frm = () => {
      if (!tokenValue.isLoading) {
        const token = tokenValue.datos;

        if (token !== "") {
          socket.emit("message", "ingreso usuario");
        }
      }
    };

    frm();
  }, [tokenValue]);

  // Cerrar sesión por inactividad
  const onIdle = () => {
    tokenDispatch({ type: TypeToken.guardar, payload: "" });
    navigate("/");
  };

  const onActive = () => {
    console.log("User is active");
  };

  useIdleTimer({
    timeout: 1000 * 60 * 60, // 1 hora
    onIdle,
    onActive,
    debounce: 500,
    events: ["mousemove", "keypress", "wheel"],
  });

  return (
    <div>
      <ToastContainer />
      <Navbar />

      {/* Contenedor principal de las vistas */}
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
