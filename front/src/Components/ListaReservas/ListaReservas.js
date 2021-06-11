import React, { Component } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './ListaReservas.css';
import axios from 'axios';
import Loader from "react-loader-spinner";

class ListaReservas extends Component {

    state = {
        restaurante:'',
        fecha: new Date(),
        reservas:[],
        restaurantes:[],
        restaurantesFetched:false
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
        // console.log("hola mundo");
        axios
        .get("http://localhost:8080/reservas/lista?restaurante="+ this.state.restaurante.id + "&fecha=" + this.formatDate(this.state.fecha))
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

    componentDidMount(){
        axios
            .get('http://localhost:8080/restaurantes')
            .then(response => {
                console.log(response.data);
                this.setState({
                    restaurantes: response.data,
                    restaurantesFetched: true
                })
            })
    }

    getValues = props => {
        this.setState({ restaurante: props.rest })
    }

    render(){

        return(
            <div style={{padding:'10px'}}>
                <div style={{maxHeight:'180px', overflowY:'scroll'}}>
                    { this.state.restaurantesFetched ?
                        this.state.restaurantes.map((rest, key) => {
                            return (
                                <div key={key} className="my-card" onClick={() => this.getValues({rest}) }>
                                {/* <li><strong>id:</strong> {mesa.id}</li> */}
                                <li><strong>Nombre:</strong> {rest.nombre}</li>
                                <li><strong>Dirección:</strong> {rest.direccion}</li>
                                </div>
                            )
                        }) :
                        <Loader
                        type="ThreeDots"
                        color="#00BFFF"
                        height={100}
                        width={100}
                        />
                    }
                </div>
                {/* <div><input type="number" name="restaurante" style={this.estiloInput} className="form-control" placeholder="Id del restaurante" min="0" onChange={this.onChangeHandler}/></div> */}
                <div className="selected-table">
                    <strong>Restaurante seleccionado:</strong> {this.state.restaurante.nombre }
                    {/* <button style={{float: 'left'}} type="button" className="btn btn-primary" onClick={()=>this.setState({confirmado: true})}>Confirmar mesa</button> */}
                </div>
                <div><DatePicker selected={this.state.fecha} className="form-control datepicker" style={this.estiloInput} onChange={this.changeDate} /> </div>
                <div><button type="button" className="btn btn-primary" style={this.estiloButton} onClick={this.getReservas}>Buscar reservas</button></div>
                <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Fecha</th>
                    <th scope="col">Hora de inicio</th>
                    <th scope="col">Hora de fin</th>
                    <th scope="col">Restaurante</th>
                    <th scope="col">Mesa</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Cliente</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.reservas.map((reserva, key) => {
                            // console.log(reserva);
                            return (
                                <tr>
                                    <th scope="row">{reserva.fecha}</th>
                                    <td>{reserva.horaInicio}:00 hs</td>
                                    <td>{reserva.horaFin}:00 hs</td>
                                    <td>{reserva.fk_restauranteid.nombre}</td>
                                    <td>#{reserva.fk_mesaid}</td>
                                    <td>{reserva.cantidadSolicitada} personas</td>
                                    <td>{reserva.fk_clienteid.nombre} {reserva.fk_clienteid.apellido}</td>
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

