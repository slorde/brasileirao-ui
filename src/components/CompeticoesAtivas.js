import React, { Component } from "react";
import { Form, Button, Spinner } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import ResultadoCompeticao from './ResultadoCompeticao'
import {withRouter} from 'react-router-dom';


class CompeticoesAtivas extends Component {
    constructor(props) {
        super();
        this.state = { competicoes: [], isFetching: false }
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


        return <div key="compativa" className="Comp">
            <p>Em andamento</p>
            <Form>
                {this.state.isFetching ? loading : conteudo}
            </Form>
      </div>
    };
}

export default withRouter(CompeticoesAtivas);