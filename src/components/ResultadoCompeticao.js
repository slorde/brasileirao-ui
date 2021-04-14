import React, { Component } from "react";
import { ListGroup } from 'react-bootstrap';

class ResultadoCompeticao extends Component {
    constructor(props) {
        super();
        this.competicao = props.competicao;
    }
    render() {
        const { id, ano, finalizada, participantes } = this.competicao;

        const winnerTheme = finalizada ? 'warning' : 'dark'; 
        const listaParticipantes = participantes.map(participante => {
            const participantTheme = participantes.findIndex(p => p.id === participante.id) === 0 ? winnerTheme : 'dark';

            return  <ListGroup  className="ResultadoNome" key={participante.id} horizontal>
            <ListGroup.Item  className="ResultadoNome" variant={participantTheme}>{participante.nome}</ListGroup.Item>
            <ListGroup.Item className="ResultadoPontuacao" variant={participantTheme}>{participante.pontuacao}</ListGroup.Item>
            </ListGroup>
        });

        return <ListGroup  key={id}>
            <ListGroup.Item variant="success">{ano}</ListGroup.Item>
            {listaParticipantes}
        </ListGroup>
    };
}

export default ResultadoCompeticao;