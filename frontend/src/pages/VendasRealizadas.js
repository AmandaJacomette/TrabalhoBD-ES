import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
// import $ from 'jquery';

import '../App.css';
import logo from "../img/logo.png"
import Popup from '../components/popuplogin';


function VendasRealizadas({userData}){
    //const history = useNavigate();
    const navigate = useNavigate();
    
    const[formData, setVenda] = useState({
        venda: {
            idVenda: 0,
            idFunc: 0,
            valor: 0,
            dataVenda: ' '
        }
    });

    const sendVendas = (data) => {
        setVenda(data);
    }

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVenda((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    /*

    function createVenda(input){
      var jqXHR = $.ajax({
          type: "POST",
          url: "/api/createVenda",
          async: false,
          data: { data: input}
      });
  
      return jqXHR.responseText;
      // return jqXHR;
  }

  function returnVendas(input){
    var data = $.ajax({
        type: "POST",
        url: "/api/returnVendas",
        async: false,
        data: { data: input}
    });

    sendVendas(data);
  }
  */

  const handleSubmit = (event) => {
    event.preventDefault();
    
    /*axios.post('http://127.0.0.1:5000/api/sendDados', formData)
      .then(response => {
        console.log('Resposta do servidor:', response.data);
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });*/
  };

    return (
      <div className="App-header">
        <form onSubmit={handleSubmit}>
            Nova Venda
            <div className='form'>
                <label>
                    ID:<br/>
                    <input 
                        name="idVenda" 
                        className='dadosVenda' 
                        value={formData.venda.idVenda}
                        onChange={handleInputChange} />
                </label>
                <label>
                    ID Funcionario:<br/>
                    <input 
                        name="idFuncionario" 
                        className='dadosVenda' 
                        value={formData.venda.idFunc}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Data:<br/>
                    <input 
                        name="dataVenda" 
                        className='dadosVenda' 
                        value={formData.venda.dataVenda}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Valor:<br/>
                    <input 
                        name="valor" 
                        className='dadosVenda' 
                        value={formData.venda.valor}
                        onChange={handleInputChange} />
                </label>
                <button type="submit"> Criar</button>
                
            </div>
        </form>
        <div className='VendasFeitas'>

        </div>
      </div>
        
        
  );
}

export default VendasRealizadas;