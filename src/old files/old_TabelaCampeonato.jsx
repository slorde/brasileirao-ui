import React, { Component } from "react";
import axios from 'axios';
import './TabelaCampeonato.css'

class TabelaCampeonato extends Component {
    constructor(props) {
        super();
        this.handleEsconder = this.handleEsconder.bind(this);
        this.handleMostrar = this.handleMostrar.bind(this);
        this.state = {exibir: false, idCompeticao:props.idCompeticao, competicao: [] }
    }
    async componentDidMount() {
        const instance = axios.create({
            baseURL: `https://brasileirao-bobos.herokuapp.com/competicoes/${this.state.idCompeticao}/resultados`,
            timeout: 10000
          });

        instance.get()
          .then((response) => {
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          })
          .then((data)  => {
              const resultados = data.map(resultado => {
                const tabela = resultado.classificacoes.map(classificacao => {
                    let pontuacao = <th>{classificacao.pontuacao}</th>;

                    if (resultado.dono.isResultado) {
                        pontuacao = null;
                    }

                    return <tr key={resultado.dono + classificacao.equipe}>
                        <th>{classificacao.posicao}</th>
                        <th>{classificacao.equipe}</th>
                        {pontuacao}
                    </tr>
                });

                let labelPontuacao = <th>Pontuação</th>;

                if (resultado.dono.isResultado) {
                    labelPontuacao = null
                }
                
                return <div className="tabela">
                <a className="dono">{resultado.dono.nome}</a>
                <p/>
                    <table>
                    <tbody>
                        <tr key="label">
                            <th>Posição</th>
                            <th>Equipe</th>
                            {labelPontuacao}
                        </tr>
                        {tabela}
                    </tbody>
                    </table>
                </div>

              });

              this.setState({ competicao:resultados })
            })
    }

    handleEsconder() {
        this.setState({exibir: false});
    }
    
    handleMostrar() {
        this.setState({exibir: true});
    }

    render() {
        let button;
        const exibir = this.state.exibir;
        const comp  = this.state.competicao;

        let teste = null;
        if (exibir) {
            button = <button onClick={this.handleEsconder}>Esconder tabelas</button>
            teste = <table><tbody><tr key="fullResult">{comp.map(c => { return <th className="showTable">{c}</th>})}</tr></tbody></table>;
        } else
            button = <button onClick={this.handleMostrar}>Mostrar tabelas</button>  
        return <div className="resultados">
            {button}
            <p></p>
            {teste}
        </div>
    }

}

export default TabelaCampeonato;