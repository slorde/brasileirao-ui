import React from "react";
import {
  useParams
} from "react-router-dom";
import ResultadoParticipantes from '../components/ResultadoParticipantes'

const CompeticoesScreen = () => {
  const { ano } = useParams();
  

  return (
    <div className="Comp">
      <ResultadoParticipantes ano={ano}/>
    </div>
  );
}

export default CompeticoesScreen;