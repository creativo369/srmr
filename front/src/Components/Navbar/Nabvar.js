import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav">
        <NavLink className="nav-link" exact to="/">
          Reserva de mesa
        </NavLink>
        <NavLink className="nav-link" exact to="/lista-reservas">
          Lista de reservas
        </NavLink>
        <NavLink className="nav-link" exact to="/consumo">
          Gestión de Consumo
        </NavLink>
      </nav>
    );
  }
}

export default Navbar;
