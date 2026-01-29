const env = import.meta.env;

export const _API_ = {
  _API_URI: env.VITE_API_URI,
  _API_PORT: env.VITE_API_PORT,
  _API_PROTOCOLO: env.VITE_API_PROTOCOLO,
};

export const _ApiRutas_ = {
  Usuario: env.VITE_API_USUARIO,
  Consultorio: env.VITE_API_CONSULTORIO,
  Cita: env.VITE_API_CITA,   
};
