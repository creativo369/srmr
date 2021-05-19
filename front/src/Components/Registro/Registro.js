
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
            apellido:'',
            statusCode: ''
        }
    }

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    registrarReserva = () => {
        console.log(this.state.ci);
        // this.clienteExiste();

        let reserva = {
            fecha: this.props.fecha,
            hora_inicio: this.props.hora_inicio,
            hora_fin: this.props.hora_fin,
            cantidadSolicitada: this.props.cantidad,
            fk_restauranteid: this.props.restauranteid,
            clienteCI: this.state.ci,
            fk_mesaid: this.props.mesaid
        }

        axios
            .post("http://localhost:8080/reservas", reserva)
            .then(response => {
                this.setState({statusCode: response.code});
                console.log(response);
                if (response.status == 204){
                    console.log('No se encontro el cliente');
                    this.setState({statusCode: 204})
                } else {
                    window.location.reload();
                }
            }).catch(error => {
                console.log(error);
            })
    }

    crearClienteRegistrarReserva = () => {

        let cliente = {
            cedula: this.state.ci,
            nombre: this.state.nombre,
            apellido: this.state.apellido
        }

        axios
            .post("http://localhost:8080/clientes/", cliente)
            .then(response => {
                console.log(response);
                if (response.status == 200){
                    this.registrarReserva();
                }
            }).catch(error => {
                console.log(error);
            });
    }

    render(){
        return(
            <>
                { this.state.statusCode != '204' ? 
                    <div>
                        <label>Ingrese su CI</label>
                        <input type="number" name="ci" className="form-control" placeholder="" min="0" value={this.state.ci} onChange={this.onChangeHandler}/>
                        <button type="button" className="btn btn-primary" onClick={this.registrarReserva}>Realizar reserva</button> 
                    </div> :
                    <div>
                        <div style={{marginTop:'20px'}}><h6 style={{color:'red'}}>No se encontro el cliente, cree uno para poder registrar una reserva</h6></div>
                        <div><input type="number" name="ci" className="form-control" placeholder="" min="0" value={this.state.ci} onChange={this.onChangeHandler} disabled/></div>
                        <div><input type="text" name="nombre" className="form-control" placeholder="Ingrese su nombre" min="0" onChange={this.onChangeHandler}/></div>
                        <div><input type="text" name="apellido" className="form-control" placeholder="Ingrese su aoellido" min="0" onChange={this.onChangeHandler}/></div>
                        <submit type="submit" className="btn btn-primary" onClick={this.crearClienteRegistrarReserva}>Crear cliente y registrar reserva</submit> 
                    </div>
                }
           </>
        );
    }
}

export default Registro;