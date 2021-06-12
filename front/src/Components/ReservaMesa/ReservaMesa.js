import React, { Component } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./ReservaMesa.css";
import Mesas from "../Mesas/Mesas";

import axios from "axios";
import Loader from "react-loader-spinner";

class ReservaMesa extends Component {
  min = null;
  max = null;

  state = {
    restaurante: "",
    fecha: new Date(),
    mesasDisponibles: [],
    fetching: false,
    restaurantes: [],
    restaurantesFetched: false,
    isComsumo: this.props.isComsumo,
  };

  changeHandler = e => {
    console.log("hola");
    this.setState({ [e.target.name]: e.target.value });
  };

  getChecked = () => {
    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    let boxes = [];
    checkboxes.forEach(box => {
      boxes.push(box.value);
    });

    let checked = [];

    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        checked.push(checkbox.value);
      }
    });

    console.log("checked:" + checked);

    return checked;
  };

  checkTime = e => {
    let checked = this.getChecked();
    console.log(checked);

    this.min = Math.min(...checked);
    this.max = Math.max(...checked) + 1;

    console.log("min:" + this.min);
    console.log("max:" + this.max);

    let checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(checkbox => {
      if (checkbox.value > this.min && checkbox.value < this.max) {
        checkbox.checked = true;
      }
    });

    if (this.min !== Infinity) {
      console.log("hola mundo");
      if (this.min < 15) {
        console.log(checkboxes);
        checkboxes.forEach(checkbox => {
          if (checkbox.value >= 19) {
            checkbox.setAttribute("disabled", true);
          }
        });
      } else if (this.min >= 19 && this.min <= 23) {
        checkboxes.forEach(checkbox => {
          if (checkbox.value <= 14) {
            checkbox.setAttribute("disabled", true);
          }
        });
      }
    } else {
      checkboxes.forEach(checkbox => {
        checkbox.removeAttribute("disabled");
      });
    }
  };

  createCheckboxes = () => {
    let arrayCheckboxes = [];
    for (let horas = 12; horas < 24; horas++) {
      if (horas > 14 && horas < 19) continue;
      arrayCheckboxes.push(
        <div key={horas}>
          <input
            className="form-check-input"
            type="checkbox"
            value={horas}
            onChange={e => this.checkTime(e)}
          />
          <label className="form-check-label">
            {horas}hs a {horas + 1}hs
          </label>
        </div>
      );
    }
    return arrayCheckboxes;
  };

  changeDate = date => {
    this.setState({ fecha: date });
  };

  fetchData() {
    console.log("fetching data...");
    Mesas.fetch();
  }

  setValues = () => {
    this.setState({
      horaMin: this.min,
      horaMax: this.max,
    });
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

  getValues = props => {
    this.setState({ restaurante: props.rest });
  };

  render() {
    let listaMesas;

    if (!this.state.fetching) {
      listaMesas = <div></div>;
    } else {
      console.log("Desplegando lista de mesas...");

      listaMesas = (
        <Mesas
          restaurante={this.state.restaurante.id}
          fecha={this.state.fecha}
          hora_inicio={this.min}
          hora_fin={this.max}
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
                    {/* <li><strong>id:</strong> {mesa.id}</li> */}
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
            {/* <button style={{float: 'left'}} type="button" className="btn btn-primary" onClick={()=>this.setState({confirmado: true})}>Confirmar mesa</button> */}
          </div>
          {/* <div><input type="text" name="restaurante" onChange={this.changeHandler} className="form-control" placeholder="Nombre restaurante"/></div> */}
          <div className="date-time">
            {this.createCheckboxes()}
            <DatePicker
              className="form-control datepicker"
              selected={this.state.fecha}
              onChange={this.changeDate}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.setState({ fetching: true })}
          >
            Buscar mesas disponibles
          </button>
        </div>
        <div className="lista-mesas">{listaMesas}</div>
      </div>
    );
  }
}

export default ReservaMesa;
