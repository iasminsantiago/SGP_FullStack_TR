import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Atividades from "../pages/Atividades/Atividades";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Page404 from "../pages/Page404/Page404";
// Adicionar importações para as páginas de Usuários e Projetos quando forem implementadas
import Usuarios from "../pages/Usuarios/USuarios";
//  Adicionar importação para Projetos quando for implementada
import Projetos from "../pages/Projetos/Projetos";
// Adicionar importação para UsuarioForm quando for implementada
import UsuarioForm from "../pages/Usuarios/UsuarioForm";
// Adicionar importação para ProjetoForm quando for implementada
import ProjetoForm from "../pages/Projetos/ProjetoForm";
// Adicionar importação para TarefaForm quando for implementada
import TarefaForm from "../pages/Atividades/TarefaForm";




class Rotas extends React.Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route index path="/" element={<Login />} />
                        <Route index path="/login" element={<Login />} />
                        <Route
                            index
                            path="/logout"
                            element={<Login action="logout" />}
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/atividades" element={<Atividades />} />
                        {/* Adicionando rota para usuario: */}
                        <Route path="/usuarios" element={<Usuarios />} />
                        {/* Adicionando rota para projetos: */}
                        <Route path="/projetos" element={<Projetos />} />
                        {/* Adicionar rota para formulário de usuário: */}
                        <Route path="/novo-usuario" element={<UsuarioForm />} />
                        {/* Adicionar rota para formulário de projeto: */}
                        <Route path="/novo-projeto" element={<ProjetoForm />} />
                        {/* Adicionar rota para formulário de tarefa: */}
                        <Route path="/nova-tarefa" element={<TarefaForm />} />




                        {/* 
                        
                        <Route path="/usuario/:id" element={<UsuarioForm />} />
                        <Route path="/projeto/:id" element={<ProjetoForm />} /> */}
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default Rotas;
