import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
// import $ from 'jquery';

import '../components/style/style.css'
import StoreContext from '../components/Store/Context';
import logo from "../img/logo.png"
import Popup from '../components/popuplogin';

function createRandomEnc(count = 5) {
    const encomendas = [];
    
    for (let i = 0; i < count; i++) {
      encomendas.push({
        id: i + 325,
        cdprod: '11198892341' + i,
        datapedido: '24-01-2024',
        quantidade: 5 + i,
        valor: 123.50 + (i/2),
        status: 'Encaminhado',
        solicitante: 'Funcionário 1',
        fornecedorCNPJ: 'XXXXXX/XXXX'
      });
    }
  
    return encomendas;
  }

function Encomendas({userData}){
    //const history = useNavigate();
    const navigate = useNavigate();
    const { setToken, token } = useContext(StoreContext);
    const [tableData, setTableData] = useState([]);

    const[formData, setEncomendas] = useState({
            id: 0,
            cdprod: 0,
            datapedido: '24-01-2024',
            quantidade: 0,
            valor: 0,
            status: ' ',
            solicitante: 'Funcionário 1',
            fornecedorCNPJ: 'XXXXXX/XXXX'
        
    });

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

    const sendEncomendas = (data) => {
        setEncomendas(data);
    }

    const handleClearEnc = () => {
        setTableData([]);
      }

    const handleCreateEnc = () => {
        const newUsers = createRandomEnc()
        setTableData([...tableData, ...newUsers])
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
      <div className="containerEnc">
        <div className="mform">
        <div class = "text">Encomendas</div>
        <form onSubmit={handleSubmit}>
           
            <div className='form-all'>
              <div class = "text">
                Criar Encomenda
              </div>
              <div class="form-row">
              <div class="input-data">
                <input 
                        name="id" 
                        className='dadosEncomenda' 
                        value={formData.id}
                        onChange={handleInputChange} required/>
                        <div class="underline"></div>
                    <label for="id">
                    ID
                    </label>
              </div>
              <div class="input-data">
                <input 
                        name="solicitante" 
                        className='dadosEncomenda' 
                        value={formData.solicitante}
                        onChange={handleInputChange} required/>
                        <div class="underline"></div>
                    <label for="solicitante">
                    Nome Solicitante
                    </label>
              </div>
                
                <div class = "input-data">
                  <input 
                        name="fornecedorCNPJ" 
                        className='dadosEncomenda' 
                        value={formData.fornecedorCNPJ}
                        onChange={handleInputChange} required />
                  <div class="underline"></div>
                <label for="fornecedorCNPJ">
                    CNPJ Fornecedor  
                </label>     
                </div>
                
              </div>
              
              <div className="form-row">
              <div class="input-data">
                  <input 
                        name="cdprod" 
                        className='dadosEncomenda' 
                        value={formData.cdprod}
                        onChange={handleInputChange} required/>
                  <div class="underline"></div>
                <label for="cdprod">
                    Código do Produto
                    
                </label>    
                </div>
              <div class = "input-data">
                  <input 
                        name="quantidade" 
                        className='dadosEncomenda' 
                        value={formData.quantidade}
                        onChange={handleInputChange} required />
                  <div class="underline"></div>
                <label for="quantidade">
                    Quantidade do Produto 
                </label>     
                </div>
                <div class="input-data">
                  <input 
                        name="valor" 
                        className='dadosEncomenda' 
                        value={formData.valor}
                        onChange={handleInputChange} required/>
                  <div class="underline"></div>
                <label for="valor">
                    Valor Total
                </label>    
                </div>
                <div class="input-data">
                  <input 
                        name="datapedido" 
                        className='dadosEncomenda' 
                        value={formData.datapedido}
                        onChange={handleInputChange} required/>
                  <div class="underline"></div>
                <label for="datapedido">
                    Data do Pedido
                </label>    
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
        <div className='encomendasFeitas'>
          <div className="mtable">
          <div class = "text">Encomendas Feitas</div>
      <button className= "update-btn" onClick={handleCreateEnc}>Criar</button>
      <button className= "delete-btn" onClick={handleClearEnc}>Deletar</button>
      {

      }
      <div class="table">
      <div class="table-header">
          
      <div class="header__item">
        <a id="id" class="filter__link">
          ID Encomenda</a>
        </div>
        <div class="header__item">
          <a id="nome" class="filter__link filter__link--number" >
           Nome Solicitante
          </a>
          </div>
          <div class="header__item">
          <a id="fornecedorCNPJ" class="filter__link filter__link--number">
            Fornecedor</a>
          </div>
          <div class="header__item">
          <a id="cdprod" class="filter__link filter__link--number">
            Código do Produto</a>
          </div>
          <div class="header__item">
          <a id="quantidade" class="filter__link filter__link--number">
            Quantidade do Produto</a>
          </div>
          <div class="header__item">
          <a id="valor" class="filter__link filter__link--number">
           Valor Total</a>
          </div>
          <div class="header__item">
          <a id="data" class="filter__link filter__link--number">
            Data do Pedido</a>
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
                  <div class="table-data">{obj.id}</div>
                  <div class="table-data">{obj.solicitante}</div>
                  <div class="table-data">{obj.fornecedorCNPJ}</div>
                  <div class="table-data">{obj.cdprod}</div>
                  <div class="table-data">{obj.quantidade}</div>
                  <div class="table-data">{obj.valor}</div>
                  <div class="table-data">{obj.datapedido}</div>
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
        
      </div>
  );
}

export default Encomendas;