import React, { useState, useEffect, useContext } from 'react';
import '../components/style/style.css'

import logo from "../img/logo.png"
import logoSimples from "../img/logoSimples.png"
import StoreContext from '../components/Store/Context';


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

  const { setToken, token } = useContext(StoreContext);

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

  const handleCreateUsers = () => {
    const newUsers = createRandomUsers()
    setTableData([...tableData, ...newUsers])
  }

  const handleClearUsers = () => {
    setTableData([]);
  }


    return (
        <div className="mform">
        <div className = "text">Funcionários</div>
      <button className= "update-btn" onClick={handleCreateUsers}>Create Users</button>
      <button className= "delete-btn" onClick={handleClearUsers}>Delete Users</button>

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

      
        </div>
  );
}

export default Departamento;