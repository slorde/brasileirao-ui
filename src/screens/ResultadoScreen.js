import React from "react";
import {
  useHistory,
  useParams
} from "react-router-dom";
import DetalhesResultados from '../components/DetalheResultado';

const CompeticoesScreen = () => {
  const { ano } = useParams();
  const history = useHistory();
  const handleReturn = () => {
    history.replace('/competicoes')
  }

  return <div>
    <DetalhesResultados ano={ano} delete={handleReturn} />
  </div>
}

export default CompeticoesScreen;