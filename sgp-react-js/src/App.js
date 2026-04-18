import "./App.css";

import GlobalProvider from "./context/GlobalContext";

import Rotas from "./routes/Rotas";
// import Login from "./pages/Login/Login";

function App() {
    return (
        <>
            <GlobalProvider>
                <Rotas />
            </GlobalProvider>
        </>
    );
}

export default App;



