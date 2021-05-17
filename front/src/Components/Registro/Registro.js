
import React, { Component } from 'react';
import axios from 'axios';

class Registro extends Component {


    constructor(props) {
        super();
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
        this.clienteExiste();
        axios
            .post("https://jsonplaceholder.typicode.com/posts", this.state)
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