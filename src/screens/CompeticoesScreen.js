import React from "react";
import Competicoes from "../components/Competicoes"
import CompeticoesAtivas from "../components/CompeticoesAtivas"
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

const CompeticoesScreen = () => {
  const auth = reactLocalStorage.get('BR_SESSION_AUTH');
  const history = useHistory();
  const { REACT_APP_BRASILEIRO_API } = process.env;


  try {
    axios.post(`${REACT_APP_BRASILEIRO_API}/resultados/update`, 
    {}, 
    {
      headers: {
        Authorization: auth 
      }
    })
    .catch((error) => {
      console.log(error);
      reactLocalStorage.set('BR_SESSION_AUTH', null);
      history.replace('/')
    });
  } catch(error) {
    console.log(error);
    reactLocalStorage.set('BR_SESSION_AUTH', null);
    history.replace('/')
  }

  return (
    <div className="Comp">
      <CompeticoesAtivas/>
      <br/>
      <Competicoes/> 
    </div>
  );
}

export default CompeticoesScreen;