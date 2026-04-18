//  Código criado em 17/04/2026
import React from "react";
import MenuTopo from "../../components/MenuTopo";

class Projetos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            carregando: true,
            erro: null,
        };
    }

    componentDidMount() {
        this.carregarProjetos();
    }

    carregarProjetos = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
            const token = usuario?.token;

            const resposta = await fetch(
                "http://localhost:8080/projetos",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!resposta.ok) {
                throw new Error("Falha ao carregar projetos");
            }

            const dados = await resposta.json();

            this.setState({
                lista: dados,
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
                        <h2>Lista de Projetos</h2>
                        <a href="/novo-projeto" className="btn btn-primary">
                            + Novo Projeto
                        </a>
                    </div>

                    {carregando && <div>Carregando...</div>}
                    {erro && <div className="alert alert-danger">{erro}</div>}

                    {!carregando && !erro && (
                        <table className="table table-bordered table-striped mt-3">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th>Status</th>
                                    <th>Data Início</th>
                                    <th>Data Conclusão</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.descricao}</td>
                                        <td>{item.status}</td>
                                        <td>{item.dataInicio}</td>
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

export default Projetos;