import React from "react";
import {
  useParams
} from "react-router-dom";
import DetalhesResultados from '../components/DetalheResultado';

const CompeticoesScreen = () => {
  const { ano } = useParams();

  return <div>
  <DetalhesResultados ano={ano}/>
</div> 
}

export default CompeticoesScreen;