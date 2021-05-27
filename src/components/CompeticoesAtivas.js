import React, { Component } from "react";
import { Form, Button, Spinner, ListGroup, Table } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import ResultadoCompeticao from './ResultadoCompeticao'
import {withRouter} from 'react-router-dom';


class CompeticoesAtivas extends Component {
    constructor(props) {
        super();
        this.state = { competicoes: [], isFetching: false, dadosBobos: [] }
        const { REACT_APP_BRASILEIRO_API } = process.env;
        this.host = REACT_APP_BRASILEIRO_API;
    }

    componentDidMount() {
        const auth = reactLocalStorage.get('BR_SESSION_AUTH');
        try {
            this.setState({ isFetching: true});
            axios.get(`${this.host}/competicoes/ativas`, { headers: { Authorization: auth }})
            .then((response) => {
              this.setState({ competicoes: response.data, isFetching: false })
            })
            .catch((error) => {
                this.setState({ isFetching: false});
              console.log(error);
            });

            axios.get(`${this.host}/competicoes/bobos`, { headers: { Authorization: auth }})
            .then((response) => {
              this.setState({ dadosBobos: response.data })
            })
            .catch((error) => {
                this.setState({ isFetching: false});
              console.log(error);
            });

        } catch(error) {
            console.log(error);
        }     
    };

    nextPath(path) {
        this.props.history.push(path);
    }

    render() {
        const loading = <Spinner animation="border" />

        const conteudo = this.state.competicoes.map(competicao => { 
            const link = competicao.iniciada ? 
            <Button onClick={() => this.nextPath(`/competicoes/ano/${competicao.ano}`)}>Detalhes</Button> :
            <Button onClick={() => this.nextPath(`/competicoes/${competicao.id}/edit`)}>Editar resultado</Button>
            
            return <div key={competicao.id}>
                <ResultadoCompeticao  competicao={competicao}/>
                <br/>
                {link}
                </div>
        });

        const campeoes = this.state.dadosBobos
            .sort(dados => dados.qtdCampeao)
            .reverse()
            .map(campeao => {
            
                const boboIndex = this.state.dadosBobos.findIndex(p => p.nome === campeao.nome);
                const theme =  boboIndex === 0 ? 'warning' : (boboIndex === 3 ? 'danger' : 'dark');
                
                return  <ListGroup key={campeao.nome} horizontal>
                    <ListGroup.Item className="HallNome" key={campeao.nome} variant={theme}>{campeao.nome}</ListGroup.Item>
                    <ListGroup.Item className="HallCampeonatos" key={campeao.qtdCampeao} variant={theme}>{campeao.qtdCampeao}</ListGroup.Item>
                    <ListGroup.Item className="HallPontuacao" key={campeao.pontuacao} variant={theme}>{campeao.pontuacao}</ListGroup.Item>
                </ListGroup>
        });
        
        const campeoesHeader = <ListGroup key={'header'} horizontal>
        <ListGroup.Item className="HallNome" key='headernome' variant='success'>Nome</ListGroup.Item>
        <ListGroup.Item className="HallCampeonatos" key='headercampeao' variant='success'>campeonatos</ListGroup.Item>
        <ListGroup.Item className="HallPontuacao" key='headerpontuacao' variant='success'>pontuação total</ListGroup.Item>
    </ListGroup>

        return <div key="compativa" className="Comp">
            <Table>
                <tr>
                    <td>
                        <p>Em andamento</p>
                        <Form>
                            {this.state.isFetching ? loading : conteudo}
                        </Form>
                    </td>
                    <td>
                        <Form className="hall">
                            {campeoes.length ? campeoesHeader: <br/>}
                            {campeoes}
                        </Form>
                    </td>
                </tr>
            </Table>
      </div>
    };
}

export default withRouter(CompeticoesAtivas);