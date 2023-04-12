import React, { Component } from "react";
import { Form, ListGroup, Spinner } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { withRouter } from 'react-router-dom';


class LeaderBoard extends Component {
    constructor(props) {
        super();
        this.state = { leaderboard: [], isFetching: false }
        const { REACT_APP_BRASILEIRO_API } = process.env;
        this.host = REACT_APP_BRASILEIRO_API;
    }

    componentDidMount() {
        const auth = reactLocalStorage.get('BR_SESSION_AUTH');
        this.setState({ isFetching: true });
        axios.get(`${this.host}/api/competitions/leaderboard`,
            { headers: { 'x-access-token': auth } }
        )
            .then((response) => {
                this.setState({ leaderboard: response.data, isFetching: false })
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        const campeoes = this.state.leaderboard
            .sort((a, b) => b.winNumbers - a.winNumbers)
            .map(campeao => {
                const boboIndex = this.state.leaderboard.findIndex(p => p.player === campeao.player);
                const theme = boboIndex === 0 ? 'warning' : (boboIndex === 3 ? 'danger' : 'dark');
console.log(campeao);
                return <ListGroup key={campeao.player} horizontal>
                    <ListGroup.Item className="HallNome" key={campeao.player} variant={theme}>{campeao.player}</ListGroup.Item>
                    <ListGroup.Item className="HallCampeonatos" key={campeao.winNumbers} variant={theme}>{campeao.winNumbers}</ListGroup.Item>
                </ListGroup>
            });
console.log('campeoes', campeoes);
        const campeoesHeader = <ListGroup key={'header'} horizontal>
            <ListGroup.Item className="HallNome" key='headernome' variant='success'>Nome</ListGroup.Item>
            <ListGroup.Item className="HallCampeonatos" key='headercampeao' variant='success'>campeonatos</ListGroup.Item>
        </ListGroup>

        const loading = <Spinner animation="border" />

        return <div className="historico">
            <p>Leaderboard</p>
            {this.state.isFetching ? loading :
                <Form className="hall">
                    {campeoes.length ? campeoesHeader : <br />}
                    {campeoes}
                </Form>
            }
        </div>
    };
}

export default withRouter(LeaderBoard);