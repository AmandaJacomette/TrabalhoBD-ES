import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/style/style.css'
import StoreContext from '../components/Store/Context';
import logo from "../img/logo.png"
import logoSimples from "../img/logoSimples.png"

function createRandomInfo(count = 5) {
  const chamados = [];
  
  for (let i = 0; i < count; i++) {
    chamados.push({
      data: '0' + i + '-01-2024',
      cpf: 2001,
      inicioPonto: '07:0' + i,
      fimPonto:'13:0' + (i % 4)
    });
  }

  return chamados;
}
/*
<a className="item-a">

					<span className="item" onClick={(event) => newMessage(event, 1)}>
					<svg width="35px" height="35px" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="6.144"></g><g id="SVGRepo_iconCarrier"><path d="M716 190.9v-67.8h-44v67.8H352v-67.8h-44v67.8H92v710h840v-710H716z m-580 44h172v69.2h44v-69.2h320v69.2h44v-69.2h172v151.3H136V234.9z m752 622H136V402.2h752v454.7z" fill="#39393A"></path><path d="M319 565.7m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="#E73B37"></path><path d="M510 565.7m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="#E73B37"></path><path d="M701.1 565.7m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="#E73B37"></path><path d="M319 693.4m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="#E73B37"></path><path d="M510 693.4m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="#E73B37"></path><path d="M701.1 693.4m-33 0a33 33 0 1 0 66 0 33 33 0 1 0-66 0Z" fill="#E73B37"></path></g></svg>
						<div className="text-span">
							Jornada de Trabalho
							</div>
						</span>
				</a>
*/

function JornadadeTrabalho({userData}){

  const navigate = useNavigate();
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

  const handleClearInfo = () => {
    setTableData([]);
  }

const handleCreateInfo = () => {
    const newUsers = createRandomInfo()
    setTableData([...tableData, ...newUsers])
}


    return (
      <div className="mform">
         <div className = "text">Jornada de Trabalho</div>
  <button className= "update-btn" onClick={handleCreateInfo}>Gerar</button>
  <button className= "delete-btn" onClick={handleClearInfo}>Deletar</button>
      <div className="mtable">
  <div class="table">
  <div class="table-header">
      
  <div class="header__item">
    <a id="data" class="filter__link">
    Data</a>
    </div>
    <div class="header__item">
      <a id="cpf" class="filter__link filter__link--number" >
      CPF
      </a>
      </div>
      <div class="header__item">
      <a id="inicioPonto" class="filter__link filter__link--number">
      Início</a>
      </div>
      <div class="header__item">
      <a id="fimPonto" class="filter__link filter__link--number">
      Fim</a>
      </div>
      

    </div>
    <div class="table-content">
      {
        tableData.map((obj) => {
          return (
            <div class="table-row">
              <div class="table-data">{obj.data}</div>
              <div class="table-data">{obj.cpf}</div>
              <div class="table-data">{obj.inicioPonto}</div>
              <div class="table-data">{obj.fimPonto}</div>
             
            </div>
          );
        })
      }
    </div>
  </div>
    </div>
    </div>

  );
}

export default JornadadeTrabalho;