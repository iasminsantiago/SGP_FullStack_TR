import React from "react";

import "./Atividades.css";

import MenuTopo from "../../components/MenuTopo";

class Atividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            carregando: true,
            erro: null,
        };
    }

    componentDidMount() {
        this.carregarAtividades();
    }

    carregarAtividades = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
            const token = usuario?.token;

            const resposta = await fetch(
                "http://localhost:8080/tarefas",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!resposta.ok) {
                throw new Error("Falha ao carregar atividades");
            }

            const dados = await resposta.json();

            this.setState({
                lista: dados,  // era "list", corrigido para "lista"
                carregando: false,
            });
        } catch (erro) {
            this.setState({
                erro: erro.message,
                carregando: false,
            });
        }
    };

    render() {
        const { lista, carregando, erro } = this.state;
        return (
            <>
                <MenuTopo />

                <div className="container mt-4 card">
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h2>Lista de Atividades</h2>
                        <a href="/nova-tarefa" className="btn btn-primary">
                            + Nova Tarefa
                        </a>
                    </div>
                    {carregando && <div>Carregando...</div>}
                    {erro && <div className="alert alert-danger">{erro}</div>}

                    {!carregando && !erro && (
                        <table className="table table-bordered table-striped mt-3">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Status</th>
                                    <th>Responsável</th>
                                    <th>Data Criação</th>
                                    <th>Data Conclusão</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.titulo}</td>
                                        <td>{item.status}</td>
                                        <td>{item.usuario?.nome}</td>
                                        <td>{item.dataCriacao}</td>
                                        <td>{item.dataConclusao}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </>
        );
    }
}

export default Atividades;
