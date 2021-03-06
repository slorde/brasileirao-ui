import React, { Component } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import { Table, Spinner } from 'react-bootstrap';
import axios from 'axios';
import ResultadoCompeticao from './ResultadoCompeticao';

class Competicoes extends Component {
    constructor(props) {
        super();
        this.state = { competicao: {}, isFetching: false }
        this.ano = props.ano;
        const { REACT_APP_BRASILEIRO_API } = process.env;
        this.host = REACT_APP_BRASILEIRO_API;
    }

    componentDidMount() {
        const auth = reactLocalStorage.get('BR_SESSION_AUTH');

        try {
            this.setState({ isFetching: true });
            axios.get(`${this.host}/competicoes/${this.ano}/resultados`, { headers: { Authorization: auth }})
            .then((response) => {
                this.setState({competicao: response.data, isFetching: false});
               })
            .catch((error) => {
                this.setState({ isFetching: false });
                console.log(error);
            });
        } catch(error) {
            console.log(error);
        }      
    };


    render() {
        const loading = <Spinner animation="border" />

        const competicao = this.state.competicao;
        const resultados = competicao.resultados ? competicao.resultados: [];
      
        const tabela = resultados.map(resultado => {

            const rows = resultado.classificacoes.map(classificacao => {
                return <tr>
                <td>{classificacao.posicao}</td>
                <td>{classificacao.equipe}</td>
                <td>{classificacao.pontuacao}</td>
              </tr>
            });
            
            return <div>
                <div className="TableTitle">{resultado.dono.nome}</div>
                <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Equipe</th>
                <th>Pontuação</th>
              </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            </Table>
            </div>
        });

        let resultado;
        if (competicao.id) {
            resultado = <ResultadoCompeticao key={competicao.id} competicao={competicao}/>
        }
       return <div>
           <div className="Comp">{resultado}</div>
           <br/>
           {this.state.isFetching ? loading : tabela}
       </div>
    };
}

export default Competicoes;