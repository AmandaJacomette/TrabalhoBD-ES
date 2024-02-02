import React, { useState, useEffect, useContext } from 'react';
import '../components/style/style.css'

import logo from "../img/logo.png"
import logoSimples from "../img/logoSimples.png"
import StoreContext from '../components/Store/Context';
import Popup from '../components/Popup';
import axios from 'axios';


function createRandomUsers(count = 5) {
  const users = [];
  
  for (let i = 0; i < count; i++) {
    users.push({
      userId: i + 120,
      cpf: "123456789 -0" + i,
      name: "Funcionario " + i,
      funcao : "Operador",
      salario: 1417.25,
      dataInicio: '01-01-2024',
      horaIntervalo: '12:30'
    });
  }

  return users;
}

function Departamento({userData}){
  const [tableData, setTableData] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonDeletePopup, setDeletePopup] = useState(false);

  const { setToken, token } = useContext(StoreContext);

  const[formData, setFunc] = useState({
    nome: '',
    cpf: '',
    senha: '',
    salario: 0,
    intervalo: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFunc((prevData) => ({
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

  const handleClearUsers = () => {
    setTableData([]);
  }

  const handleCreateUsers = () => {
    setButtonPopup(true);
  }

  const handleDelete = () => {
    setDeletePopup(true);
  }

  const handleSubmitModal = (event) => {
    event.preventDefault();
    console.log(formData.id);
    console.log(formData.status);

    axios.post('http://127.0.0.1:5000/api/criaFuncionario', formData)
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        setButtonPopup(false);
        //handleClearEnc()
        //handleCreateEnc(event)
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
  }

  const handleSubmitDelete = (event) => {
    event.preventDefault();
    console.log(formData.id);
    console.log(formData.status);

    axios.post('http://127.0.0.1:5000/api/deletaEncomenda', formData)
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        setDeletePopup(false);
        //handleClearEnc()
        //handleCreateEnc(event)
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });

      
  }

    return (
        <div className="mform">
        <div className = "text">Funcionários</div>
        
      <button className= "update-btn" onClick={handleCreateUsers}>Criar</button>
      <button className= "delete-btn" onClick={handleDelete}>Deletar</button>

      <div class="table">
      <div class="table-header">
          
        <div class="header__item">
          <a id="cpf" class="filter__link filter__link--number" >
            CPF
          </a>
          </div>
          <div class="header__item">
          <a id="nome" class="filter__link filter__link--number">
            Funcionário</a>
          </div>
          <div class="header__item">
          <a id="funcao" class="filter__link filter__link--number">
            Função</a>
          </div>
          <div class="header__item">
          <a id="salario" class="filter__link filter__link--number">
            Salário</a>
          </div>
          <div class="header__item">
          <a id="dataInicio" class="filter__link filter__link--number">
            Data Início</a>
          </div>
          <div class="header__item">
          <a id="horaIntervalo" class="filter__link filter__link--number">
            Hora de Intervalo</a>
          </div>

        </div>
        <div class="table-content">
          {
            tableData.map((obj) => {
              return (
                <div class="table-row">
                  <div class="table-data">{obj.cpf}</div>
                  <div class="table-data">{obj.name}</div>
                  <div class="table-data">{obj.funcao}</div>
                  <div class="table-data">{obj.salario}</div>
                  <div class="table-data">{obj.dataInicio}</div>
                  <div class="table-data">{obj.horaIntervalo}</div>
                </div>
              );
            })
          }
        </div>
      </div>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <div className='container-modal'>
            <div className="text-modal">Criar Funcionario</div>
            <form onSubmit={handleSubmitModal}>
              <div class="input-modal">
                <label className='modalLabel' for="cdprod">
                  Nome
                </label>
                <input 
                      name="nome" 
                      className='dadosEncomenda' 
                      value={formData.nome}
                      onChange={handleInputChange} required/>
              </div>

              <div class = "input-modal">
                <label className='modalLabel' for="quantidade">
                  CPF
                </label>
                <input 
                      name="cpf" 
                      className='dadosEncomenda' 
                      value={formData.cpf}
                      onChange={handleInputChange} required />
              </div>

              <div class = "input-modal">
                <label className='modalLabel' for="quantidade">
                  Senha
                </label>
                <input 
                      name="senha" 
                      className='dadosEncomenda' 
                      value={formData.senha}
                      onChange={handleInputChange} required />
              </div>

              <div class = "input-modal">
                <label className='modalLabel' for="quantidade">
                  Salario
                </label>
                <input 
                      name="salario" 
                      className='dadosEncomenda' 
                      value={formData.salario}
                      onChange={handleInputChange} required />
              </div>

              <div class = "input-modal">
                <label className='modalLabel' for="quantidade">
                  Intervalo
                </label>
                <input 
                      name="intervalo" 
                      className='dadosEncomenda' 
                      value={formData.intervalo}
                      onChange={handleInputChange} required />
              </div>

              <button className= "modalButton" 
              type = "submit"
             >Atualizar</button>
              </form> 
          </div>
        </Popup>

        <Popup trigger={buttonDeletePopup} setTrigger={setDeletePopup}>
          <div className='container-modal'>
            <div className="text-modal">Deleta Encomenda</div>
            <form onSubmit={handleSubmitDelete}>
              <div class="input-modal">
              <label className='modalLabel' for="cdprod">
                  ID
                </label>
                  <input 
                        name="id" 
                        className='dadosEncomenda' 
                        value={formData.id}
                        onChange={handleInputChange} required/>
                  
                </div>
              <button className= "modalButton" 
              type = "submit"
             >Excluir</button>
              </form> 
          </div>
        </Popup>
      
        </div>
  );
}

export default Departamento;