import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UsuarioProvider from "./Providers/usuario.provider";
import TokenProvider from "./Providers/token.provider";



createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <TokenProvider>
            <UsuarioProvider>
                <App />
            </UsuarioProvider>
        </TokenProvider>
    </BrowserRouter>
)