import React, { useState, useEffect, useContext } from 'react';
import $ from 'jquery';
import '../App.css';
import logo from "../img/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Popup from '../components/popuplogin';
import StoreContext from '../components/Store/Context';
import axios from 'axios';

function Formulario({navigation}){
    //const history = useNavigate();
    const navigate = useNavigate();
    const { setToken, token } = useContext(StoreContext);

    
    const [formData, setFormData] = useState({
        login: '2001', 
        senha: '123', 
    });

    const[user, setUser] = useState({
      id: 2001,
      cpf: "123456789-01",
      name: "Funcionario 10",
      funcao : "Gerente",
      salario: 4500.55,
      dataInicio: '01-01-2024',
      horaIntervalo: '16:00'
    });

    const sendUserData = (userData) => {
      setUser(userData);
    }
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    function runPyScript(input){
      var jqXHR = $.ajax({
          type: "POST",
          url: "/api/searchFuncionario",
          async: false,
          data: { cpf: input}
      });
    
      var data = $.ajax({
        type: "POST",
        url: "/api/returnFuncionario",
        async: false,
        data: { cpf: input}
    });
    sendUserData(data);
      
    return jqXHR.responseText;
    // return jqXHR;
    }

    const handleSubmit = (event) => {

      axios.post('http://127.0.0.1:5000/api/sendDados', formData)
      .then(response => {
        
        console.log('Resposta do servidor:', response.data);
        var result = runPyScript(formData);

        if(response.data.error != true){

          if (result['response'] == 3){
            setToken({token: 3});
            navigate("/EntrarCaixa",  { replace: false }, {state: { userData: user }});

          } else if (result['response'] == 2) {
            setToken({token: 2});

          } else if (result['response'] == 1) {
            setToken({token: 1});

          }
        
        } else {
          window.alert("Erro ao fazer login! verifique seu usuario e senha e tente novamente.");
        }
        
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
        /* TEMPORARIO */
        if (formData.login == '2001' && formData.senha == '123'){
          setToken({token: 1});
          console.log(token);
          navigate("/EntrarCaixa",  { replace: false }, {state: {userData: user}});
        }

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
            <div className='form'>
                <img src={logo} className='logo'/>
                <label>
                    Login:<br/>
                    <input 
                        name="login" 
                        className='dadosLogin' 
                        value={formData.login}
                        onChange={handleInputChange} />
                </label>
                <label>
                    Senha:<br/>
                    <input 
                        name="senha" 
                        className='dadosLogin' 
                        value={formData.senha}
                        onChange={handleInputChange} />
                </label>
                <button type="submit"> Login </button>
                
            </div>
        </form>
      </div>
        
        
  );
}

export default Formulario;