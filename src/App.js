import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store, persistor } from "./store/";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/*Paginas*/
import Login from "./view/login/";
import NovoUsuario from "./view/usuario-novo/";
import Home from "./view/home/";
import UsuarioRecuperarSenha from "./view/usuario-recuperar-senha/";
import EventoCadastro from "./view/evento-cadastro/";
import EventoDetalhes from "./view/evento-detalhes/";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/eventos/:parametro" component={Home} />
          <Route exact path="/novo-usuario" component={NovoUsuario} />
          <Route exact path="/login" component={Login} />
          <Route
            exact
            path="/recuperar-senha"
            component={UsuarioRecuperarSenha}
          />
          <Route exact path="/cadastrar-evento" component={EventoCadastro} />
          <Route path="/detalhes-do-evento/:id" component={EventoDetalhes} />
          <Route path="/editar-evento/:id" component={EventoCadastro} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
