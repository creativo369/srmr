import React, { Component } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import "./Mesas.css";
import Registro from "../Registro/Registro";

class Mesas extends Component {
  selectedTable = null;
  confirmado = false;
  constructor(props) {
    super();
    this.state = {
      data: [],
      fetched: false,
      selected: "",
      restaurante: props.restaurante,
      fecha: this.formatDate(props.fecha),
      hora_inicio: props.hora_inicio,
      hora_fin: props.hora_fin,
      cantidadMesa: "",
      confirmado: false,
    };
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  componentDidMount() {
    console.log("fecha: " + this.formatDate(this.state.fecha));
    const f = this.formatDate(this.props.fecha);
    console.log(f);
    axios
      .get(
        "http://localhost:8080/reservas?restaurante=" +
          this.state.restaurante +
          "&fecha=" +
          f +
          "&hora_inicio=" +
          this.state.hora_inicio +
          "&hora_fin=" +
          this.state.hora_fin
      )
      .then((response) => {
        console.log(response);
        this.setState({
          data: response.data,
          fetched: true,
        });
      });
  }

  getValues = (props) => {
    this.selectedTable = props.mesa.id;
    this.setState({ cantidadMesa: props.mesa.capacidad });
    this.setState({ selected: true });
  };

  confirmarMesa = () => {
    this.confirmado = true;
  };

  render() {
    return (
      <div>
        <div style={{ maxHeight: "365px", overflowY: "scroll" }}>
          {this.state.fetched ? (
            this.state.data.map((mesa, key) => {
              return (
                <div
                  key={key}
                  className="my-card"
                  onClick={() => this.getValues({ mesa })}
                >
                  <li>
                    <strong>id:</strong> {mesa.id}
                  </li>
                  <li>
                    <strong>nombre:</strong> {mesa.nombre}
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
          <strong>Mesa seleccionada:</strong> {this.selectedTable}
          <button
            style={{ float: "right" }}
            type="button"
            className="btn btn-primary"
            onClick={() => this.setState({ confirmado: true })}
          >
            Confirmar mesa
          </button>
        </div>
        {this.state.confirmado === true ? (
          <Registro
            hora_inicio={this.props.hora_inicio}
            hora_fin={this.props.hora_fin}
            restauranteid={this.props.restaurante}
            fecha={this.state.fecha}
            mesaid={this.selectedTable}
            cantidad={this.state.cantidadMesa}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Mesas;
