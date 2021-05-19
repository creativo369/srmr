
import React, { Component } from 'react';
import axios from 'axios';

class Registro extends Component {


    constructor(props) {
        super();
        console.log(props);
        this.state = {
            mesaId: props.selectedTable,
            ci:'',
            nombre:'',
            apellido:''
        }
    }

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    clienteExiste = clienteCI => {
        axios
            .get("url") //get cliente si existe
            .then(response => {
                console.log(response);
                //si no existe desplegar formulario de creacion
            })
            .catch(error => {
                console.log(error);
            })
            
    }

    registrarReserva = () => {
        console.log(this.state.ci);
        // this.clienteExiste();

        let payload = {
            fecha: this.props.fecha,
            hora_inicio: this.props.hora_inicio,
            hora_fin: this.props.hora_fin,
            cantidadSolicitada: this.props.cantidad,
            fk_restauranteid: this.props.restauranteid,
            clienteCI: this.state.ci,
            fk_mesaid: this.props.mesaid
        }

        axios
            .post("http://localhost:8080/reservas", payload)
            .then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
    }

    registroCliente = () => {
        return (
            <>
                <label>Ingrese su CI</label>
                <input type="number" name="ci" className="form-control"/>
                <label>Ingrese su nombre</label>
                <input type="number" name="ci" className="form-control"/>
                <label>Ingrese su apellido</label>
                <input type="number" name="ci" className="form-control"/>
            </>
        );
    }

    render(){
        return(
            <>
                <label>Ingrese su CI</label>
                <input type="number" name="ci" className="form-control" placeholder="" min="0" value={this.state.ci} onChange={this.onChangeHandler}/>
                <button type="button" className="btn btn-primary" onClick={this.registrarReserva}>Realizar reserva</button>
           </>
        );
    }
}

export default Registro;