import React, { Component } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import './Mesas.css';
import Registro from '../Registro/Registro';

class Mesas extends Component {

    selectedTable = null;
    constructor(props) {
        super();
        this.state = {
            data: [],
            fetched: false,
            selected: '',
            restaurante:props.restaurante,
            fecha: props.fecha,
            hora_inicio: props.hora_inicio,
            hora_fin: props.hora_fin
        }
    }


    formatDate(date) {
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

    componentDidMount() {
        const number = 1;
        console.log("fecha: " + this.formatDate(this.state.fecha));
       
        axios.get("http://localhost:8080/reservas?restaurante="+this.state.restaurante+"&fecha="+this.formatDate(this.state.fecha)+
                    "&hora_inicio="+this.state.hora_inicio+"&hora_fin="+this.state.hora_fin)
            .then(response => {
                console.log(response);
                this.setState({
                    data: response.data,
                    fetched: true
                });
            })
    }

    getValues = props => {
        this.selectedTable = props.mesa.id;
        this.setState({selected: true})
    }

    render(){
        //id, name, email, body
        //nombre, posicionX, posicionY, planta, capacidad

        return(
            <div>
                { this.state.fetched ?
                    this.state.data.map((mesa, key) => {
                        return (
                            <div key={key} className="my-card" onClick={() => this.getValues({mesa}) }>
                            <li><strong>id:</strong> {mesa.id}</li>
                            <li><strong>nombre:</strong> {mesa.name}</li>
                            <li><strong>email:</strong> {mesa.email}</li>
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
                <div className="selected-table">
                    <strong>Mesa seleccionada:</strong> {this.selectedTable }
                </div>
                <Registro selectedTable={this.state.selected}/>
            </div>
        );
    }
}

export default Mesas;