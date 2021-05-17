import React, { Component } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './ListaReservas.css';

class ListaReservas extends Component {


    state = {
        restauranteID:'',
        fecha: new Date(),
        clienteID:'',
    }

    estiloInput={
        display:'block',
        margin:'10px auto',
        width:'16.5%'
    }

    estiloButton={
        marginTop:'20px'
    }

    changeDate = date => {
        this.setState({fecha: date});
    }

    render(){
        return(
            <div>
                <input type="number" name="restaurante" style={this.estiloInput} className="form-control" placeholder="Id del restaurante" min="0" />
                <DatePicker selected={this.state.fecha} className="form-control datepicker" style={this.estiloInput} onChange={this.changeDate} /> 
                <input type="number" name="clienteId" className="form-control" style={this.estiloInput} placeholder="Id del cliente" min="0" />
                <button type="button" className="btn btn-primary" style={this.estiloButton}>Buscar reservas</button>
            </div>
        );
    }
}

export default ListaReservas;