import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {withRouter} from 'react-router-dom';
import axios from 'axios';
// import $ from 'jquery';

import logo from "../img/logo.png"
import Popup from '../components/popuplogin';
import '../components/style/style.css'
import StoreContext from '../components/Store/Context';

function createRandomChamados(count = 5) {
  const chamados = [];
  
  for (let i = 0; i < count; i++) {
    chamados.push({
      idFunc: '200' + i,
      nome: 'Funcionario 1',
      departamento: '2',
      titulo: 'Chamado Teste ' + i,
      assunto: 'Assunto do Chamado ' + i,
      status: 'Encaminhado'
    });
  }

  return chamados;
}

function RecursosHumanos({userData}){
    //const history = useNavigate();
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
    const { setToken, token } = useContext(StoreContext);
    
    const[formData, setChamados] = useState({
            idFunc: '2001',
            nome: 'Funcionario',
            departamento: '2',
            titulo: 'Chamado Teste',
            assunto: 'Assunto do Chamado',
            status: ' '
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChamados((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        /*
        const response = await fetch("https://cities-qd9i.onrender.com/agents");
        const agents = await response.json();
        
        setTableData(agents);
        */
       console.log(tableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
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

  const handleClearChamados = () => {
    setTableData([]);
  }

const handleCreateChamados = () => {
    const newUsers = createRandomChamados()
    setTableData([...tableData, ...newUsers])
}


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
                    <label for="idFunc">
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
                <label for="departamento">
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
                <label for="titulo">
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
                <label for="assunto">
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
      <button className= "update-btn" onClick={handleCreateChamados}>Criar</button>
      <button className= "delete-btn" onClick={handleClearChamados}>Deletar</button>
   
        <div className="mtable">
      <div class="table">
      <div class="table-header">
          
      <div class="header__item">
        <a id="idFunc" class="filter__link">
          ID</a>
        </div>
        <div class="header__item">
          <a id="nome" class="filter__link filter__link--number" >
           Nome
          </a>
          </div>
          <div class="header__item">
          <a id="departamento" class="filter__link filter__link--number">
            Departamento</a>
          </div>
          <div class="header__item">
          <a id="titulo" class="filter__link filter__link--number">
            Titulo</a>
          </div>
          <div class="header__item">
          <a id="assunto" class="filter__link filter__link--number">
            Assunto</a>
          </div>
          <div class="header__item">
          <a id="status" class="filter__link filter__link--number">
           Status</a>
          </div>


        </div>
        <div class="table-content">
          {
            tableData.map((obj) => {
              return (
                <div class="table-row">
                  <div class="table-data">{obj.idFunc}</div>
                  <div class="table-data">{obj.nome}</div>
                  <div class="table-data">{obj.departamento}</div>
                  <div class="table-data">{obj.titulo}</div>
                  <div class="table-data">{obj.quantidade}</div>
                  <div class="table-data">{obj.assunto}</div>
                  <div class="table-data">{obj.status}</div>
                </div>
              );
            })
          }
        </div>
      </div>
        </div>

        </div>
      </div>
        
        
  );
}

export default RecursosHumanos;