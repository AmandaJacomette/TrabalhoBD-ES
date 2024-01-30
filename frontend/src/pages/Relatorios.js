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
      totalFunc: (i) * 150,
      totalVendas: 20000 + (400 * i) + 0.75,
      totalForn: 134 + (i * 5),
      totalProdutos: 35335 + (250 * i),
      totalPrateleiras: 168,
      dataPeriodo: "01-0" + (i + 1) + "-2024"
    });
  }

  return chamados;
}

function Relatorios({userData}){

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
         <div className = "text">Relatório</div>
  <button className= "update-btn" onClick={handleCreateInfo}>Gerar</button>
  <button className= "delete-btn" onClick={handleClearInfo}>Deletar</button>
      <div className="mtable">
  <div class="table">
  <div class="table-header">
      
  <div class="header__item">
    <a id="totalFunc" class="filter__link">
    Funcionários</a>
    </div>
    <div class="header__item">
      <a id="totalVendas" class="filter__link filter__link--number" >
      Vendas
      </a>
      </div>
      <div class="header__item">
      <a id="totalForn" class="filter__link filter__link--number">
      Fornecedores</a>
      </div>
      <div class="header__item">
      <a id="totalProdutos" class="filter__link filter__link--number">
      Produtos</a>
      </div>
      <div class="header__item">
      <a id="totalPrateleiras" class="filter__link filter__link--number">
      Prateleiras</a>
      </div>
      <div class="header__item">
      <a id="dataPeriodo" class="filter__link filter__link--number">
      Período</a>
      </div>


    </div>
    <div class="table-content">
      {
        tableData.map((obj) => {
          return (
            <div class="table-row">
              <div class="table-data">{obj.totalFunc}</div>
              <div class="table-data">{obj.totalVendas}</div>
              <div class="table-data">{obj.totalForn}</div>
              <div class="table-data">{obj.totalProdutos}</div>
              <div class="table-data">{obj.totalPrateleiras}</div>
              <div class="table-data">{obj.dataPeriodo}</div>
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

export default Relatorios;