import React, { useState, useEffect } from 'react';
import '../App.css';
import logo from "../img/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Popup from '../components/popuplogin';
import axios from 'axios';




function Formulario({navigation}){
    //const history = useNavigate();
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        login: '2001', 
        senha: '123', 
    });
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleSubmit = (event) => {

      axios.post('http://127.0.0.1:5000/api/sendDados', formData)
      .then(response => {
        
        console.log('Resposta do servidor:', response.data);
        if(response.data.error != true){
          navigate("EntrarCaixa",  { replace: false });
        } else {
          window.alert("Erro ao fazer login! verifique seu usuario e senha e tente novamente.");
        }
        
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
        
        

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