import React from "react";
import {
  useParams
} from "react-router-dom";
import EditResultados from '../components/EditResultados';

const CompeticoesScreen = () => {
  const { id } = useParams();
  return <div>
  <EditResultados id={id}/>
</div> 
}

export default CompeticoesScreen;