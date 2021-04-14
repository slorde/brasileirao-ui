import React from 'react';
import { BrowserRouter , Switch, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import LoginScreen from './screens/LoginScreen'
import CompeticoesScreen from './screens/CompeticoesScreen'
import ResultadoScreen from './screens/ResultadoScreen.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <div>
            <NavBar/>
            <Switch>
            <Route path="/competicoes/ano/:ano">
                <ResultadoScreen/>
              </Route>
              <Route path="/competicoes">
                <CompeticoesScreen/>
              </Route>
              <Route path="/">
                <LoginScreen/>
              </Route>
            </Switch>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
