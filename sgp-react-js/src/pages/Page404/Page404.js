import React from "react";

import "./Page404.css";

import robo_404 from "../../assets/img/robo_404.png";

class Page404 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    render() {
        return (
            <>
                <img className="robo_404" alt="Robo 404" src={robo_404} />
                <h1 className="texto_404">Página não encontrada</h1>
                <h2 className="texto_404">{document.referrer ? document.referrer : null}</h2>
            </>
        );
    }
}

export default Page404;
