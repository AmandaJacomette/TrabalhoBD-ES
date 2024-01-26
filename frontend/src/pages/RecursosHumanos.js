import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {withRouter} from 'react-router-dom';
import axios from 'axios';
// import $ from 'jquery';

import logo from "../img/logo.png"
import Popup from '../components/popuplogin';
import '../components/style/style.css'


function RecursosHumanos({userData}){
    //const history = useNavigate();
    const navigate = useNavigate();
    
    const[formData, setChamados] = useState({
            idFunc: '2001',
            nome: 'Funcionario',
            departamento: '2',
            titulo: 'Chamado Teste',
            assunto: 'Assunto do Chamado'
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChamados((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    /*
    function sendChamado(input){
      var jqXHR = $.ajax({
          type: "POST",
          url: "/api/sendChamado",
          async: false,
          data: { data: input}
      });
  
      return jqXHR.responseText;
      // return jqXHR;
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
      <div className="mform">
        <div class = "text">Recursos Humanos</div>
        <form onSubmit={handleSubmit}>
           
            <div className='form-all'>
              <div class = "text">
                Abrir Chamado
              </div>
              <div class="form-row">
              <div class="input-data">
                <input 
                        name="idFunc" 
                        className='dadosChamado' 
                        value={formData.idFunc}
                        onChange={handleInputChange} required/>
                        <div class="underline"></div>
                    <label htmlFor="idFunc">
                    ID Funcionario
                    </label>
              </div>
              <div class="input-data">
                <input 
                        name="nome" 
                        className='dadosChamado' 
                        value={formData.nome}
                        onChange={handleInputChange} required/>
                        <div class="underline"></div>
                    <label for="nome">
                    Nome
                    </label>
              </div>
              <div class="input-data">
                  <input 
                        name="departamento" 
                        className='dadosChamado' 
                        value={formData.departamento}
                        onChange={handleInputChange} required/>
                  <div class="underline"></div>
                <label htmlFor="departamento">
                    Departamento
                    
                </label>    
                </div>
                
                <div class = "input-data">
                  <input 
                        name="titulo" 
                        className='dadosChamado' 
                        value={formData.titulo}
                        onChange={handleInputChange} required />
                  <div class="underline"></div>
                <label htmlFor="titulo">
                    Titulo  
                </label>     
                </div>
                
              </div>
              <div className='form-row'>
              <div class = "input-data textarea">
              <textarea name="assunto" 
                        className='dadosChamado' 
                        value={formData.assunto}
                        onChange={handleInputChange} 
                        rows="8" cols="80" required>

              </textarea>
                <br />
                
                <div class="underline-textarea"></div>
                <label htmlFor="assunto">
                    Assunto
                </label>
                <br />
                </div>
                </div>
                <div class="form-row submit-btn">
                  <div class="input-data">
                    <div class="inner"></div>
                      <input type="submit" value="submit"/>

                  </div>
                </div>
                
                
            </div>
        </form>
        <div className='Chamados'>
          <div class = "text">Chamados</div>
        </div>
      </div>
        
        
  );
}

export default RecursosHumanos;