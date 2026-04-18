// código criado em 17/04/2026

import React from "react";
import MenuTopo from "../../components/MenuTopo";

class ProjetoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            descricao: "",
            dataInicio: "",
            dataConclusao: "",
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

            const resposta = await fetch("http://localhost:8080/projetos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    nome: this.state.nome,
                    descricao: this.state.descricao,
                    dataInicio: this.state.dataInicio,
                    dataConclusao: this.state.dataConclusao,
                    status: this.state.status,
                    usuario: { id: usuario.id }
                }),
            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar projeto");
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
                        <h2>Novo Projeto</h2>

                        {sucesso && (
                            <div className="alert alert-success">
                                Projeto cadastrado com sucesso!
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
                                <label className="form-label">Descrição</label>
                                <textarea
                                    className="form-control"
                                    value={this.state.descricao}
                                    onChange={(e) => this.setState({ descricao: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Data Início</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={this.state.dataInicio}
                                    onChange={(e) => this.setState({ dataInicio: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Data Conclusão</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={this.state.dataConclusao}
                                    onChange={(e) => this.setState({ dataConclusao: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-control"
                                    value={this.state.status}
                                    onChange={(e) => this.setState({ status: e.target.value })}
                                >
                                    <option value="ATIVO">Ativo</option>
                                    <option value="INATIVO">Inativo</option>
                                    <option value="CONCLUIDO">Concluído</option>
                                </select>
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

export default ProjetoForm;