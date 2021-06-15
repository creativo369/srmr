import React, { Component } from "react";

import axios from "axios";
import Loader from "react-loader-spinner";
import ListaMesas from "../Mesas/ListaMesas";
import DetallesConsumo from "./DetallesConsumo";

class Consumo extends Component {
  state = {
    restaurante: {},
    restaurantes: [],
    restaurantesFetched: false,
    fetching: false,
    mesa: {},
  };

  getValues = props => {
    this.setState({ restaurante: props.rest });
  };

  componentDidMount() {
    axios.get("http://localhost:8080/restaurantes").then(response => {
      console.log(response.data);
      this.setState({
        restaurantes: response.data,
        restaurantesFetched: true,
      });
    });
  }

  // http://localhost:8080/consumo

  getData = mesa => {
    console.log("Desde consumo");
    console.log(mesa);
    this.setState({ mesa: mesa });
  };

  render() {
    let listaMesas;

    if (!this.state.fetching) {
      listaMesas = <div></div>;
    } else {
      console.log("Desplegando lista de mesas...");

      listaMesas = (
        <ListaMesas
          restaurante={this.state.restaurante.id}
          sendData={this.getData}
        />
      );
    }

    return (
      <div className="test">
        <div className="form-mesas">
          <div style={{ maxHeight: "180px", overflowY: "scroll" }}>
            {this.state.restaurantesFetched ? (
              this.state.restaurantes.map((rest, key) => {
                return (
                  <div
                    key={key}
                    className="my-card"
                    onClick={() => this.getValues({ rest })}
                  >
                    <li>
                      <strong>Nombre:</strong> {rest.nombre}
                    </li>
                    <li>
                      <strong>Dirección:</strong> {rest.direccion}
                    </li>
                  </div>
                );
              })
            ) : (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
              />
            )}
          </div>
          <div className="selected-table">
            <strong>Restaurante seleccionado:</strong>{" "}
            {this.state.restaurante.nombre}
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: 10 }}
            onClick={() => this.setState({ fetching: true })}
          >
            Ver mesas
          </button>
        </div>
        <div className="lista-mesas">{listaMesas}</div>

        <div>
          {Object.keys(this.state.mesa).length !== 0 ? (
            <DetallesConsumo mesa={this.state.mesa} />
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
}

export default Consumo;
