import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [ isFetching, setIsFetching ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState(false);

    const history = useHistory();
    const { REACT_APP_BRASILEIRO_API } = process.env;
    
    function validateForm() {
      return login.length > 0 && password.length > 0;
    }
  
    const handleClick = async () => {
      try {
        setIsFetching(true);
        setErrorMessage(false);
        axios.post(`${REACT_APP_BRASILEIRO_API}/login`, {
            login,
            senha: password
          })
          .then((response) => {
            setIsFetching(false);
            reactLocalStorage.set('BR_SESSION_AUTH', response.data.token);
            history.replace('/competicoes')
          })
          .catch((error) => {
            setIsFetching(false);
            setErrorMessage(true);
            console.log(error);
          });
      } catch (error) {
        console.log('error geral', error);
        alert('Erro no login')
      }
    }
  
    return (
    <div className="Login">
        <Form width="20%">
          <Form.Group controlId="login">
            <Form.Label>Login</Form.Label>
            <Form.Control
              autoFocus
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button type="button" disabled={!validateForm()} onClick={handleClick}>
            {isFetching ? 'Enviando': 'Login'}
          </Button>
          <Form.Label className="ErrorMessage">{errorMessage ?'Login ou Senha Incorretos': ''}</Form.Label>
        </Form>
      </div>
    );
  }