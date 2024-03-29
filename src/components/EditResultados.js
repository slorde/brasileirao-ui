import React, { Component } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Spinner } from 'react-bootstrap';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 2;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  fontSize: 13,
  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});


class Competicoes extends Component {
  constructor(props) {
    super();
    this.state = { classificacoes: [], mensagemSucesso: '', isFetching: false }
    this.id = props.id;
    const { REACT_APP_BRASILEIRO_API } = process.env;
    this.host = REACT_APP_BRASILEIRO_API;
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleReturn = props.delete;
  }

  componentDidMount() {
    const auth = reactLocalStorage.get('BR_SESSION_AUTH');
    this.setState({ isFetching: true });
    axios.get(`${this.host}/api/competitions/${this.id}/my`,
      { headers: { 'x-access-token': auth } })
      .then((response) => {
        const list = response.data ? response.data : [];
        this.setState({ classificacoes: list.map(l => { return { equipe: l } }), isFetching: false });
      })
      .catch((error) => {
        this.setState({ isFetching: false });
        console.log(error);
      });
  };

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const classificacoes = reorder(
      this.state.classificacoes,
      result.source.index,
      result.destination.index
    );

    this.setState({
      classificacoes
    });
  };


  async handleClick() {
    const auth = reactLocalStorage.get('BR_SESSION_AUTH');
    this.setState({ mensagemSucesso: '' });
    const classificacoes = this.state.classificacoes;
    const novaClassificacao = classificacoes.map(classificacao => {
      const posicao = classificacoes.findIndex(c => c.equipe === classificacao.equipe) + 1;
      return {
        position: posicao, team: classificacao.equipe
      }
    });

    axios.put(`${this.host}/api/results/${this.id}`, {
      standings: novaClassificacao
    }, { headers: { 'x-access-token': auth } })
      .then((response) => {
        this.setState({ mensagemSucesso: 'Resultado atualizado' });
      })
      .catch((error) => {
        this.setState({ mensagemSucesso: 'Deu erro na atualização' });
        console.log(error);
      });
  }

  render() {
    const loading = <Spinner animation="border" />
    const conteudo =
      <table>
        <tbody>
          <tr>
            <td>
              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {this.state.classificacoes.map((item, index) => (
                        <Draggable key={item.equipe} draggableId={item.equipe} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                              <table>
                                <td width="25px"><strong>{(index + 1)}</strong></td>
                                <td>{item.equipe}</td>
                              </table>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </td>
            <td className="ColumnTop">
              <table>
                <tbody>
                  <tr><td>Clica e arrasta os times na ordem e envia</td></tr>
                  <tr><td><Button className="Edit" onClick={this.handleClick}>Enviar</Button></td></tr>
                  <tr><td>{this.state.mensagemSucesso}</td></tr>
                  <tr><td><Button className="Edit" onClick={this.handleReturn}>Voltar</Button></td></tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>


    return <div className="Edit"> {this.state.isFetching ? loading : conteudo}  </div>
  };
}

export default Competicoes;