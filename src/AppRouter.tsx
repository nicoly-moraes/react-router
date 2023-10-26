import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import CadastroEndereco from "./pages/CadastroEndereco";
import ListaEnderecos from "./pages/ListaEnderecos";
import Layout from "./pages/Layout";

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={ Layout }>
                    <Route
                        path="/"
                        element={<Navigate to="/enderecos/lista" replace />}
                    />
                    <Route path="enderecos/lista" Component={ ListaEnderecos } />
                    <Route path="endereco/cadastro" Component={ CadastroEndereco } />
                    <Route path="endereco/cadastro/:id" Component={ CadastroEndereco } />
                </Route>
            </Routes>
        </Router>
    );
}
