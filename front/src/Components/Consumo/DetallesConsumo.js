import React, { Component } from "react";

import axios from "axios";

class DetallesConsumo extends Component {
  state = {
    mesa: this.props.mesa,
    consumo: {},
    cliente: {},
    addingDetail: false,
    productos: [],
    cantidad: 0,
    producto: {},
  };

  onChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    console.log("from detalle consumo");
    // console.log(this.props.mesa);
    axios
      .get("http://localhost:8080/consumo/" + this.state.mesa.id)
      .then(consumo => {
        this.setState({
          consumo: consumo.data,
          cliente: consumo.data.fk_clienteid, //es necesario pasar el id del cliente?
        });
      });

    axios.get("http://localhost:8080/productos/").then(productos => {
      this.setState({ productos: productos.data });
    });
  }

  addNewDetailButton = () => {
    return (
      <button
        className="btn btn-primary"
        style={{ marginTop: 20 }}
        onClick={() => this.setState({ addingDetail: true })}
      >
        Agregar nuevos detalles
      </button>
    );
  };

  addNewDetailForm = () => {
    return (
      <>
        <form method="POST">
          <div style={{ marginTop: 50 }}>
            <h3>Agregar detalle</h3>
            <label>Producto</label>
            <select
              id="selectProducts"
              className="form-select "
              aria-label="Default select example"
              style={{
                maxWidth: 250,
                display: "inline-block",
                marginLeft: 10,
                marginRight: 20,
              }}
            >
              {this.state.productos.map((producto, key) => {
                return (
                  <option key={key} value={producto.id}>
                    {producto.nombre}
                  </option>
                );
              })}
            </select>
            <label>Cantidad</label>
            <input
              style={{ maxWidth: 250 }}
              type="number"
              name="cantidad"
              className="form-control"
              min="0"
              onChange={this.onChangeHandler}
            />
            <div>
              <submit
                type="submit"
                className="btn btn-primary"
                onClick={this.addDetail}
              >
                Agregar
              </submit>
            </div>
          </div>
        </form>
      </>
    );
  };

  addDetail = () => {
    let select = document.getElementById("selectProducts");
    let index = select.selectedIndex;
    let idProducto = select.options[index].value;

    let detail = {
      cantidad: this.state.cantidad,
      productoid: idProducto,
      consumoid: this.state.consumo.id,
    };

    console.log(detail);

    axios.post("http://localhost:8080/consumo/producto", detail).then(ans => {
      console.log(ans);
      window.location.reload();
    });
  };

  render() {
    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Mesa</th>
              <th scope="col">Cliente</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{this.state.consumo.estado}</th>
              <td># {this.state.mesa.id}</td>
              <td>
                {this.state.cliente.nombre} {this.state.cliente.apellido}
              </td>
              <td>{this.state.consumo.total} Gs.</td>
            </tr>
          </tbody>
        </table>
        {/* <button class="btn btn-primary">Cambiar de cliente</button> */}
        {this.state.addingDetail == false
          ? this.addNewDetailButton()
          : this.addNewDetailForm()}
      </>
    );
  }
}

export default DetallesConsumo;
