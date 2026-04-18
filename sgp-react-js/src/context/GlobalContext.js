import React, { createContext } from "react";

export const GlobalContext = createContext();

class GlobalProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            usuarioLogado:
                JSON.parse(localStorage.getItem("usuarioLogado")) || null,
            login: this.login,
            logout: this.logout,
        };
    }

    login = (usuario) => {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        this.setState({ usuarioLogado: usuario });
    };

    logout = () => {
        localStorage.removeItem("usuarioLogado");
        this.setState({ usuarioLogado: null });
    };

    render() {
        return (
            <GlobalContext.Provider value={this.state}>
                {this.props.children}
            </GlobalContext.Provider>
        );
    }
}

export default GlobalProvider;
