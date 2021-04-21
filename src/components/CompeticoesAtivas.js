import React, { Component } from "react";
import { Form } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import ResultadoCompeticao from './ResultadoCompeticao'

class CompeticoesAtivas extends Component {
    constructor(props) {
        super();
        this.state = { competicoes: [] }
        const { REACT_APP_BRASILEIRO_API } = process.env;
        this.host = REACT_APP_BRASILEIRO_API;
    }

    componentDidMount() {
        const auth = reactLocalStorage.get('BR_SESSION_AUTH');
        try {
            axios.get(`${this.host}/competicoes/ativas`, { headers: { Authorization: auth }})
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
            const link = competicao.iniciada ? 
            <a href={`/competicoes/ano/${competicao.ano}`}>Detalhes</a> :
            <a href={`/competicoes/${competicao.id}/edit`}>Editar resultado</a>
            
            return <div>
                <ResultadoCompeticao key={competicao.id} competicao={competicao}/>
                {link}
                </div>
        });


        return <div key="compativa" className="Comp">
            <p>Em andamento</p>
            <Form>
                {conteudo}
            </Form>
        
      </div>
    };
}

export default CompeticoesAtivas;