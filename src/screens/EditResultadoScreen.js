import React from "react";
import {
  useHistory,
  useParams
} from "react-router-dom";
import EditResultados from '../components/EditResultados';

const CompeticoesScreen = () => {
  const { id } = useParams();
  const history = useHistory();
  const handleReturn = () => {
    history.replace('/competicoes')
  }

  return <div>
    <EditResultados id={id} delete={handleReturn} />
  </div>
}

export default CompeticoesScreen;