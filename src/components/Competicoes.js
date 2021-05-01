import React, { Component } from "react";
import { ListGroup, Spinner } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';

class Competicoes extends Component {
    constructor(props) {
        super();
        this.state = { competicoes: [], isFetching: false }
        const { REACT_APP_BRASILEIRO_API } = process.env;
        this.host = REACT_APP_BRASILEIRO_API;
    }

    componentDidMount() {
        const auth = reactLocalStorage.get('BR_SESSION_AUTH');
        try {
            this.setState({ isFetching: true });
            axios.get(`${this.host}/competicoes/anos`, { headers: { Authorization: auth }})
            .then((response) => {
              this.setState({ competicoes: response.data, isFetching: false });
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

        const conteudo = this.state.competicoes.map(competicao => {
            return <ListGroup.Item 
            action 
            key={competicao}
            eventKey={competicao}
             href={`/competicoes/ano/${competicao}`}>
            {competicao}
            </ListGroup.Item>
        })

        return <div className="Login">
            <p>Histórico</p>
            {this.state.isFetching ? loading : <div></div>}
            <ListGroup defaultActiveKey="#link1">
                {conteudo}
            </ListGroup>        
      </div>
    };
}

export default Competicoes;