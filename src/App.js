import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home } from "./pages/Home/";
import { VisualizarAnuncio } from "./pages/VisualizarAnuncio/";
import { CadastrarAnuncio } from "./pages/CadastrarAnuncio/";
import { EditarAnuncio } from "./pages/EditarAnuncio/";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/visualizar-anuncio" component={VisualizarAnuncio} />
          <Route path="/cadastrar-anuncio" component={CadastrarAnuncio} />
          <Route path="/editar-anuncio" component={EditarAnuncio} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
