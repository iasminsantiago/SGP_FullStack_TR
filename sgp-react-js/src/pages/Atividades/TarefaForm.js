// codigo criado em 17/04/2026


import React from "react";
import MenuTopo from "../../components/MenuTopo";

class TarefaForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titulo: "",
            descricao: "",
            dataCriacao: "",
            dataConclusao: "",
            prioridade: "BAIXA",
            status: "PENDENTE",
            projetoId: "",
            sucesso: false,
            erro: null,
            projetos: [],
        };
    }

    componentDidMount() {
        this.carregarProjetos();
    }

    carregarProjetos = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
            const token = usuario?.token;

            const resposta = await fetch("http://localhost:8080/projetos", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const dados = await resposta.json();
            this.setState({ projetos: dados });
        } catch (erro) {
            console.error("Erro ao carregar projetos", erro);
        }
    };

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
            const token = usuario?.token;

            const resposta = await fetch("http://localhost:8080/tarefas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    titulo: this.state.titulo,
                    descricao: this.state.descricao,
                    dataCriacao: this.state.dataCriacao,
                    dataConclusao: this.state.dataConclusao,
                    prioridade: this.state.prioridade,
                    status: this.state.status,
                    projeto: { id: this.state.projetoId },
                    usuario: { id: usuario.id }
                }),
            });

            if (!resposta.ok) {
                throw new Error("Erro ao cadastrar tarefa");
            }

            this.setState({ sucesso: true, erro: null });

        } catch (erro) {
            this.setState({ erro: erro.message });
        }
    };

    render() {
        const { sucesso, erro, projetos } = this.state;
        return (
            <>
                <MenuTopo />
                <div className="container mt-4">
                    <div className="card p-4">
                        <h2>Nova Tarefa</h2>

                        {sucesso && (
                            <div className="alert alert-success">
                                Tarefa cadastrada com sucesso!
                            </div>
                        )}
                        {erro && (
                            <div className="alert alert-danger">{erro}</div>
                        )}

                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Título</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.titulo}
                                    onChange={(e) => this.setState({ titulo: e.target.value })}
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
                                <label className="form-label">Data Criação</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={this.state.dataCriacao}
                                    onChange={(e) => this.setState({ dataCriacao: e.target.value })}
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
                                <label className="form-label">Prioridade</label>
                                <select
                                    className="form-control"
                                    value={this.state.prioridade}
                                    onChange={(e) => this.setState({ prioridade: e.target.value })}
                                >
                                    <option value="BAIXA">Baixa</option>
                                    <option value="MEDIA">Média</option>
                                    <option value="ALTA">Alta</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-control"
                                    value={this.state.status}
                                    onChange={(e) => this.setState({ status: e.target.value })}
                                >
                                    <option value="PENDENTE">Pendente</option>
                                    <option value="EM_ANDAMENTO">Em Andamento</option>
                                    <option value="CONCLUIDA">Concluída</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Projeto</label>
                                <select
                                    className="form-control"
                                    value={this.state.projetoId}
                                    onChange={(e) => this.setState({ projetoId: e.target.value })}
                                    required
                                >
                                    <option value="">Selecione um projeto</option>
                                    {projetos.map((p) => (
                                        <option key={p.id} value={p.id}>{p.nome}</option>
                                    ))}
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

export default TarefaForm;