import React, { Component } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import { Table, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import ResultadoCompeticao from './ResultadoCompeticao';

class Competicoes extends Component {
    constructor(props) {
        super();
        this.state = { competicoes: [], isFetching: false }
        this.ano = props.ano;
        const { REACT_APP_BRASILEIRO_API } = process.env;
        this.host = REACT_APP_BRASILEIRO_API;
        this.handleReturn = props.delete;
    }

    componentDidMount() {
        const auth = reactLocalStorage.get('BR_SESSION_AUTH');

        try {
            this.setState({ isFetching: true });
            axios.get(`${this.host}/api/competitions?type=started&year=${this.ano}`,
                { headers: { 'x-access-token': auth } })
                .then((response) => {
                    this.setState({ competicoes: response.data, isFetching: false });
                })
                .catch((error) => {
                    this.setState({ isFetching: false });
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };


    render() {
        const loading = <Spinner animation="border" />;
        const tabela = this.state.competicoes.map(competicao => {
            const resultTable = competicao.participants.map(p => {
                const results = p.results
                    .sort((a, b) => a.team.localeCompare(b.team))
                    .map((r) => {
                        return <tr>
                            <td>{r.position}</td>
                            <td>{r.team}</td>
                        </tr>
                    })

                return <div>
                    <div className="TableTitle">{p.playerName}</div>
                    <Table striped bordered hover size="sm" variant="dark">
                        <tr>
                            <th>Posição</th>
                            <th>Equipe</th>
                        </tr>
                        <tbody>
                            {results}
                        </tbody>
                    </Table>
                </div>
            }).map(p => {
                return <td>{p}</td>
            });

            const panel = <div>
                <ResultadoCompeticao key={competicao.id} competicao={competicao} />
                <Button onClick={this.handleReturn}>Voltar</Button>
            </div>
            resultTable.unshift(panel)
            return <table>
                <tbody>
                    <tr>
                        {resultTable}
                    </tr>
                </tbody>
            </table>
        });

        // let resultado;
        // if (competicao.id) {
        //     resultado = <ResultadoCompeticao key={competicao.id} competicao={competicao} />
        // }
        return <div flex className="resultado-detalhe">
            {/* <div className="Comp">{resultado}</div> */}
            <br />
            {this.state.isFetching ? loading : tabela}
        </div>
    };
}

export default Competicoes;