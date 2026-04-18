import React from "react";
import { Navigate } from "react-router-dom";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { GlobalContext } from "../../context/GlobalContext";

import "./Login.css";

import sgp_logo_vertical from "../../assets/img/sgp_logo_vertical.png";

class Login extends React.Component {
    static contextType = GlobalContext;

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            email: "",
            senha: "",
            redirect: false,
            erro: null,
        };
    }

    togglePasswordVisibility = () => {
        this.setState((prev) => ({ showPassword: !prev.showPassword }));
    };

    realizarLogin = async (e) => {
        e.preventDefault();

        this.setState({ erro: null });

        try {
            const response = await fetch(
                // "http://localhost:8080/api/usuarios/login",
                "http://localhost:8080/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: this.state.email,
                        senha: this.state.senha,
                    }),
                }
            );

            if (!response.ok) {
                this.setState({ erro: "Email e/ou senha inválidos" });
                return;
            }

            const usuario = await response.json();

            this.context.login(usuario);

            this.setState({ redirect: true });
        } catch (error) {
            this.setState({ erro: "Erro ao conectar ao servidor" });
        }
    };

    render() {
        if (this.state.redirect) {
            return <Navigate to="/dashboard" replace />;
        }

        const { showPassword, erro } = this.state;

        return (
            <div className="containerPrincipal">
                <div className="containerConteudo">
                    <div className="containerLogin">
                        <div className="card sgp_card_login">
                            <img
                                className="card-img-top sgp_logo_vertical"
                                alt=""
                                src={sgp_logo_vertical}
                            />

                            <div className="card-body">
                                <form onSubmit={this.realizarLogin}>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            E-mail
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="usuario@dominio.com"
                                            value={this.state.email}
                                            onChange={(e) =>
                                                this.setState({
                                                    email: e.target.value,
                                                })
                                            }
                                        />
                                    </div>

                                    <div
                                        className="mb-3"
                                        style={{ position: "relative" }}
                                    >
                                        <label className="form-label">
                                            Senha
                                        </label>
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="form-control"
                                            value={this.state.senha}
                                            onChange={(e) =>
                                                this.setState({
                                                    senha: e.target.value,
                                                })
                                            }
                                            style={{ paddingRight: "2.5rem" }}
                                        />
                                        <button
                                            type="button"
                                            onClick={
                                                this.togglePasswordVisibility
                                            }
                                            style={{
                                                position: "absolute",
                                                right: "10px",
                                                top: "70%",
                                                transform: "translateY(-50%)",
                                                background: "none",
                                                border: "none",
                                                cursor: "pointer",
                                                color: "#6c757d",
                                            }}
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash size={20} />
                                            ) : (
                                                <FaEye size={20} />
                                            )}
                                        </button>
                                    </div>

                                    {erro && (
                                        <div className="alert alert-danger text-center">
                                            {erro}
                                        </div>
                                    )}

                                    <div className="d-grid gap-2">
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
