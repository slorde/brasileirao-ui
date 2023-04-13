import React from "react";
import Competicoes from "../components/Competicoes"
import CompeticoesAtivas from "../components/CompeticoesAtivas"
import Leaderboard from "../components/Leaderboard";
import { useHistory } from "react-router-dom";

const CompeticoesScreen = () => {
  const history = useHistory();
  const handleYearClick = (year) => {
    history.replace(`/competicoes/ano/${year}`);
  }

  return (
    <div key="compativa" className="Comp">
      <table className="comp-table">
        <tbody>
          <tr>
            <td>
              <CompeticoesAtivas />
            </td>
            <td>
              <Competicoes click={handleYearClick}/>
            </td>
            <td>
              <Leaderboard />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompeticoesScreen;