// Novo arquivo


import React from "react";
import MenuTopo from "../../components/MenuTopo";

class Usuarios extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: [],
            carregando: true,
            erro: null,
        };
    }

    componentDidMount() {
        this.carregarUsuarios();
    }

    carregarUsuarios = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
            const token = usuario?.token;

            const resposta = await fetch(
                "http://localhost:8080/usuarios",
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            if (!resposta.ok) {
                throw new Error("Falha ao carregar usuários");
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
                    {/* Adicionando botão para novo usuário */}
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <h2>Lista de Usuários</h2>
                        <a href="/novo-usuario" className="btn btn-primary">
                            + Novo Usuário
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
                                    <th>Email</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.nome}</td>
                                        <td>{item.email}</td>
                                        <td>{item.status}</td>
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

export default Usuarios;