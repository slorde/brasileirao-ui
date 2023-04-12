import React from "react";
import Competicoes from "../components/Competicoes"
import CompeticoesAtivas from "../components/CompeticoesAtivas"
import Leaderboard from "../components/Leaderboard";

const CompeticoesScreen = () => {
  return (
    <div key="compativa" className="Comp">
      <table className="comp-table">
        <tbody>
          <tr>
            <td>
              <CompeticoesAtivas />
            </td>
            <td>
              <Competicoes />
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