import React, { useEffect, useState } from "react";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const history = useHistory();
  const { REACT_APP_BRASILEIRO_API } = process.env;

  function validateForm() {
    return login.length > 0 && password.length > 0;
  }

  const onKeyUp = (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  }

  useEffect(() => {
    const auth = reactLocalStorage.get('BR_SESSION_AUTH');
    if (auth) {
      axios.get(`${REACT_APP_BRASILEIRO_API}/api/users/check`,
        { headers: { 'x-access-token': auth } })
        .then((response) => {
          if (response.status === 204)
            history.replace('/competicoes')
        })
        .catch((error) => {
          console.log(error);
        });
    }

    axios.post(`${REACT_APP_BRASILEIRO_API}/api/competitions/update`,
      { headers: { 'x-access-token': auth } })
      .then(() => {
        console.log('update ok');
      })
      .catch((error) => {
        console.log(error);
      });
  })

  const handleClick = async () => {
    if (isFetching)
      return;

    try {
      setIsFetching(true);
      setErrorMessage(false);
      axios.post(`${REACT_APP_BRASILEIRO_API}/api/users/signin`, {
        username: login,
        password: password
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
      <label>Login</label>
      <input className="login-input" onKeyPress={onKeyUp} value={login} onChange={(e) => setLogin(e.target.value)}></input>
      <label>Password</label>
      <input type="password" className="login-input" onKeyPress={onKeyUp} value={password} onChange={(e) => setPassword(e.target.value)}></input>
      <Button
        className="button-login"
        disabled={!validateForm()}
        onClick={handleClick}>
        {isFetching ? 'Enviando' : 'Login'}
      </Button>
      <label className="ErrorMessage">{errorMessage ? errorMessage : ''}</label>
    </div>
  );
}