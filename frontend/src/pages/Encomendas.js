import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
// import $ from 'jquery';

import '../App.css';
import logo from "../img/logo.png"
import Popup from '../components/popuplogin';


function Encomendas({userData}){
    //const history = useNavigate();
    const navigate = useNavigate();
    
    const[formData, setEncomendas] = useState({
        encomenda: {
            id: 0,
            cdprod: 0,
            datapedido: ' ',
            quantidade: 0,
            valor: 0,
            status: ' ',
            solicitante: ' '
        }
    });

    const sendEncomendas = (data) => {
        setEncomendas(data);
    }

    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEncomendas((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    /*
    function createEncomenda(input){
      var jqXHR = $.ajax({
          type: "POST",
          url: "/api/createEncomenda",
          async: false,
          data: { data: input}
      });
  
      return jqXHR.responseText;
      // return jqXHR;
  }

  function returnEncomendas(input){
    var data = $.ajax({
        type: "POST",
        url: "/api/returnEncomenda",
        async: false,
        data: { data: input}
    });

    sendEncomendas(data);
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
            Nova Encomenda
            <div className='form'>
                <label>
                    ID:<br/>
                    <input 
                        name="login" 
                        className='dadosLogin' 
                        value={formData.encomenda.id}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Código Produto:<br/>
                    <input 
                        name="senha" 
                        className='dadosLogin' 
                        value={formData.encomenda.cdprod}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Data:<br/>
                    <input 
                        name="login" 
                        className='dadosLogin' 
                        value={formData.encomenda.datapedido}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Quantidade:<br/>
                    <input 
                        name="senha" 
                        className='dadosLogin' 
                        value={formData.encomenda.quantidade}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Solicitante:<br/>
                    <input 
                        name="login" 
                        className='dadosLogin' 
                        value={formData.encomenda.solicitante}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Valor:<br/>
                    <input 
                        name="senha" 
                        className='dadosLogin' 
                        value={formData.encomenda.valor}
                        onChange={handleInputChange} />
                </label>
                <button type="submit"> Criar</button>
                
            </div>
        </form>
        <div className='EncomendasFeitas'>

        </div>
      </div>
        
        
  );
}

export default Encomendas;