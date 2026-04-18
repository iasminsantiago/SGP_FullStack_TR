import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { GlobalContext } from "../context/GlobalContext";
import { Navigate } from "react-router-dom";

import { getUsuario } from "../services/auth";

import sgp_logo_horizontal from "../assets/img/sgp_logo_horizontal.png";

class MenuTopo extends React.Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
        };
        // this.usuario = { "nome":  "Usuário teste" };
        this.usuario = getUsuario();
    }

    handleLogout = () => {
        this.context.logout();
        this.setState({ redirect: true });
    };

    render() {
        if (this.state.redirect) {
            return <Navigate to="/login" replace />;
        }

        return (
            <>
                <Navbar bg="light" data-bs-theme="light" sticky="top">
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <img
                                src={sgp_logo_horizontal}
                                alt="SGP Logo"
                                className="d-inline-block align-top"
                                width="150"
                            />
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/atividades">Tarefas</Nav.Link>
                            <Nav.Link href="/projetos">Projetos</Nav.Link>
                            <Nav.Link href="/usuarios">Usuários</Nav.Link>
                        </Nav>
                        <Nav>
                            <label className="me-3">
                                {this.usuario ? this.usuario.nome : "Usuário"}
                            </label>
                            <Nav.Link onClick={this.handleLogout}>
                                Sair
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </>
        );
    }
}

export default MenuTopo;
