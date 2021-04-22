import React, { Component } from "react";
import { ListGroup } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';

class Competicoes extends Component {
    constructor(props) {
        super();
        this.state = { competicoes: [] }
        const { REACT_APP_BRASILEIRO_API } = process.env;
        this.host = REACT_APP_BRASILEIRO_API;
    }

    componentDidMount() {
        const auth = reactLocalStorage.get('BR_SESSION_AUTH');
        try {
            axios.get(`${this.host}/competicoes/anos`, { headers: { Authorization: auth }})
            .then((response) => {
              this.setState({ competicoes: response.data })
            })
            .catch((error) => {
              console.log(error);
            });
        } catch(error) {
        console.log(error);
        }          
    };


    render() {
        const conteudo = this.state.competicoes.map(competicao => {
            return <ListGroup.Item 
            action 
            key='123'
            eventKey={competicao}
             href={`/competicoes/ano/${competicao}`}>
            {competicao}
            </ListGroup.Item>
        })

        return <div className="Login">
            <p>Histórico</p>
            <ListGroup defaultActiveKey="#link1">
                {conteudo}
            </ListGroup>        
      </div>
    };
}

export default Competicoes;