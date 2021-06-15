import React, { Component } from "react";

import DetallesConsumo from "../Consumo/DetallesConsumo";

import axios from "axios";
import Loader from "react-loader-spinner";

class ListaMesas extends Component {
  state = {
    restaurante: this.props.restaurante,
    mesas: [],
    mesasFetched: true,
    mesa: {},
    confirmarMesa: false,
  };

  componentDidMount() {
    console.log("Mesas de restaurante");
    axios
      .get("http://localhost:8080/mesas/restaurante/" + this.state.restaurante)
      .then(response => {
        console.log(response.data);
        this.setState({
          mesas: response.data,
          mesasFetched: true,
        });
      });
  }

  getValues = props => {
    // console.log(props.mesa);
    this.setState({ mesa: props.mesa });
  };

  buttonClicked = () => {
    console.log("desde lista mesas");
    console.log(this.state.mesa);
    this.props.sendData(this.state.mesa);
  };

  render() {
    return (
      <div>
        <div style={{ maxHeight: "365px", overflowY: "scroll" }}>
          {this.state.mesasFetched ? (
            this.state.mesas.map((mesa, key) => {
              return (
                <div
                  key={key}
                  className="my-card"
                  onClick={() => this.getValues({ mesa })}
                >
                  <li>
                    <strong>Mesa #{mesa.id}</strong>
                  </li>
                  <li>
                    <strong>Nombre:</strong> {mesa.nombre}
                  </li>
                  <li>
                    <strong>Capacidad:</strong> {mesa.capacidad}
                  </li>
                </div>
              );
            })
          ) : (
            <Loader type="ThreeDots" color="#00BFFF" height={100} width={100} />
          )}
        </div>
        <div className="selected-table">
          <strong>Mesa seleccionada:</strong> {this.state.mesa.id}
          <button
            style={{ float: "right" }}
            type="button"
            className="btn btn-primary"
            onClick={this.buttonClicked}
          >
            Confirmar mesa
          </button>
        </div>
      </div>
    );
  }
}

export default ListaMesas;
