import React, { Component } from "react";
import axios from 'axios';
import './ResultadoCampeonato.css'
import TabelaCampeonato from "./TabelaCampeonato";

class ResultadoCampeonato extends Component {
    constructor() {
        super();
        this.state = {
            competicoes: []
        }
    }
    async componentDidMount() {
        const instance = axios.create({
            baseURL: 'https://brasileirao-bobos.herokuapp.com/competicoes/ativas',
            timeout: 30000
          });

        instance.get()
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then((data)  => {
            const competicoes = data.map(competicao => {
                const participantes = competicao.participantes.map(participante => {
                    return <tr key={participante.nome}>
                        <th>{participante.nome}</th>
                        <th>{participante.pontuacao}</th>
                    </tr>
                })

               return <div className="comp">
                  <a className="ano">Resultados de {competicao.ano}</a>
                  <p/>
                  <table>
                    <tbody>
                      {participantes}
                    </tbody>
                  </table>
                  <p/>
                  <TabelaCampeonato idCompeticao={competicao.id}/>
                </div>
            })
            this.setState({ competicoes:competicoes })
          })  
    }

    render() {
        return <div className="all">
            {this.state.competicoes}
        </div>
    }

}

export default ResultadoCampeonato;