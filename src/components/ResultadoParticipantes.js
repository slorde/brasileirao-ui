import React, { Component } from "react";
import { ListGroup } from 'react-bootstrap';
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';

class ResultadoParticipantes extends Component {
    constructor(props) {
        super();
        this.ano = props.ano;
        this.state = { resultados: []};
    }

    componentDidMount() {
        const auth = reactLocalStorage.get('BR_SESSION_AUTH');
        const { REACT_APP_BRASILEIRO_API } = process.env;
        try {
            axios.get(`${REACT_APP_BRASILEIRO_API}/competicoes/${this.ano}/resultados`, { headers: { Authorization: auth }})
            .then((response) => {
                this.setState({ resultados: response.data })
            })
            .catch((error) => {
            console.log(error);
            });
        } catch(error) {
            console.log(error);
        } 
    }

    render() {
        const map = this.state.resultados.map(resultado => {
            const { dono, classificacoes } = resultado;

            return 
        });

        
        const winnerTheme = finalizada ? 'warning' : 'dark'; 
        const listaParticipantes = participantes.map(participante => {
            const participantTheme = participantes.findIndex(p => p.id === participante.id) === 0 ? winnerTheme : 'dark';

            return  <ListGroup  className="ResultadoNome" key={dono.id} horizontal>
            <ListGroup.Item  className="ResultadoNome" variant="dark">{participante.nome}</ListGroup.Item>
            <ListGroup.Item className="ResultadoPontuacao" variant="dark">{participante.pontuacao}</ListGroup.Item>
            </ListGroup>
        });

        return <ListGroup  key={id}>
            <ListGroup.Item variant="success">{ano}</ListGroup.Item>
            {listaParticipantes}
        </ListGroup>
    };
}

export default ResultadoParticipantes;