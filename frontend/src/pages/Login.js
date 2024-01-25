import React, { useState, useEffect, useContext } from 'react';
import '../App.css';
import logo from "../img/logo.png"
import { Link, useNavigate } from 'react-router-dom';
import StoreContext from '../components/Store/Context';
import {withRouter} from 'react-router-dom';
import Popup from '../components/popuplogin';
import axios from 'axios';




function Formulario({navigation}){
    //const history = useNavigate();
    const navigate = useNavigate()
    const { setToken, token } = useContext(StoreContext);

    
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
        
        if(response.data.error != true){
          if(response.data.option == 1){
            navigate("EntrarCaixa",  { replace: false });
          } else if(response.data.option == 2){
            setToken({token: 1});
            navigate("Home",  { replace: false });
          }
          
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