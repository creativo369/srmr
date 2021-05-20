import React, { Component } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './ListaReservas.css';
import axios from 'axios';

class ListaReservas extends Component {

    state = {
        restaurante:'',
        fecha: new Date(),
        reservas:[]
    }

    estiloInput={
        display:'block',
        margin:'auto',
        width:'16.5%'
    }

    estiloButton={
        marginTop:'20px',
        marginBottom: '20px'
    }

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    changeDate = date => {
        this.setState({fecha: date});
    }

    getReservas = () =>{
        console.log("hola mundo");
        axios
        .get("http://localhost:8080/reservas/lista?restaurante="+ this.state.restaurante + "&fecha=" + this.formatDate(this.state.fecha))
        .then(response => {
            console.log(response);
            this.setState(
                {reservas: response.data}
            )
        });
    }

    formatDate = date =>  {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    render(){

        return(
            <div style={{padding:'10px'}}>
                <div><input type="number" name="restaurante" style={this.estiloInput} className="form-control" placeholder="Id del restaurante" min="0" onChange={this.onChangeHandler}/></div>
                <div><DatePicker selected={this.state.fecha} className="form-control datepicker" style={this.estiloInput} onChange={this.changeDate} /> </div>
                <div><button type="button" className="btn btn-primary" style={this.estiloButton} onClick={this.getReservas}>Buscar reservas</button></div>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora de inicio</th>
                    <th scope="col">Hora de fin</th>
                    <th scope="col">Restaurante id</th>
                    <th scope="col">Mesa id</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Cliente id</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.reservas.map((reserva, key) => {
                            return (
                                <tr>
                                    <th scope="row">{reserva.fecha}</th>
                                    <td>{reserva.horaInicio}</td>
                                    <td>{reserva.horaFin}</td>
                                    <td>{reserva.fk_restauranteid}</td>
                                    <td>{reserva.fk_mesaid}</td>
                                    <td>{reserva.cantidadSolicitada}</td>
                                    <td>{reserva.fk_clienteid}</td>
                                    {/* <td>{reserva.fk_clienteid}</td> */}
                                </tr>
                            );
                        })
                    }
                </tbody>
                </table>
            </div>
        );
    }
}

export default ListaReservas;

