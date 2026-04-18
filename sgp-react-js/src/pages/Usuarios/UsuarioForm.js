// codigo criado em 17/04/2026

import React from "react";
import MenuTopo from "../../components/MenuTopo";

class UsuarioForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            email: "",
            senha: "",
            cpf: "",
            dataNascimento: "",
            status: "ATIVO",
            sucesso: false,
            erro: null,
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
            const token = usuario?.token;

            const resposta = await fetch("http://localhost:8080/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome: this.state.nome,
                    email: this.state.email,
                    senha: this.state.senha,
                    cpf: this.state.cpf,
                    dataNascimento: this.state.dataNascimento,
                    status: this.state.status,
                }),
            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar usuário");
            }

            this.setState({ sucesso: true, erro: null });

        } catch (erro) {
            this.setState({ erro: erro.message });
        }
    };

    render() {
        const { sucesso, erro } = this.state;
        return (
            <>
                <MenuTopo />
                <div className="container mt-4">
                    <div className="card p-4">
                        <h2>Novo Usuário</h2>

                        {sucesso && (
                            <div className="alert alert-success">
                                Usuário cadastrado com sucesso!
                            </div>
                        )}
                        {erro && (
                            <div className="alert alert-danger">{erro}</div>
                        )}

                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nome</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.nome}
                                    onChange={(e) => this.setState({ nome: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Senha</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={this.state.senha}
                                    onChange={(e) => this.setState({ senha: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">CPF</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.cpf}
                                    onChange={(e) => this.setState({ cpf: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Data de Nascimento</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={this.state.dataNascimento}
                                    onChange={(e) => this.setState({ dataNascimento: e.target.value })}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default UsuarioForm;