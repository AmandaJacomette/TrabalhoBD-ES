import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/style/style.css'
import StoreContext from '../components/Store/Context';
import logo from "../img/logo.png"
import logoSimples from "../img/logoSimples.png"

function createRandomProdutos(count = 5) {
  const chamados = [];
  
  for (let i = 0; i < count; i++) {
    chamados.push({
      idProd: '300' + (i % 4),
      nome: 'Produto ' + i,
      valor: 40 * (i % 4) + 0.75,
      fornecedorCNPJ: '19.999.999/0001-0' + i,
      codBarra: '590123412345' + i
    });
  }

  return chamados;
}

function createRandomEstoque(count = 5) {
  const chamados = [];
  
  for (let i = 0; i < count; i++) {
    chamados.push({
      idEstoq: '1' + (i % 4),
      secaoEstoq: 'Frios',
      qtdeMaxProdEstoq: 500 * ((i) % 4 + 1),
      qtdeMinProdEstoq: 250,
      qtdeAtualProdEstoq: 415 + ((i) % 4 + 1)
     
    });
  }

  return chamados;
}

function createRandomPrateleira(count = 10) {
  const chamados = [];
  
  for (let i = 0; i < count; i++) {
    chamados.push({
      idPrat: '5' + (i % 4),
      secaoPrat: 'HortiFruti',
      qtdeMaxProdPrat: 1600 * ((i) % 4 + 1),
      qtdeMinProdPrat: 850,
      qtdeAtualProdPrat: 935 + ((i) % 4 + 1)
     
    });
  }

  return chamados;
}

function EstoqueePrateleiras({userData}){
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

  const handleClearEstoque = () => {
    setTableData([]);
  }

const handleCreateEstoque = () => {
    const newUsers = createRandomEstoque()
    setTableData([...tableData, ...newUsers])
}


const handleClearPrats = () => {
  setTableData([]);
}

const handleCreatePrats = () => {
  const newUsers = createRandomPrateleira()
  setTableData([...tableData, ...newUsers])
}

const handleReporEstoque = () => {
  console.log("Funcionalidade de Reposição de Estoque");
}

const handleReporPrateleira = () => {
  console.log("Funcionalidade de Reposição de Prateleira");
}



    return (
      <div className="container">
      <div className="mform">
         <div className = "text">Estoque</div>
  <button className= "update-btn" onClick={handleCreateEstoque}>Criar</button>
  <button className= "delete-btn" onClick={handleClearEstoque}>Deletar</button>
  <button className= "update-btn" onClick={handleReporEstoque}>Repor</button>
      <div className="mtable">
  <div class="table">
  <div class="table-header">
      
  <div class="header__item">
    <a id="idEstoq" class="filter__link">
      ID</a>
    </div>
    <div class="header__item">
      <a id="secaoEstoq" class="filter__link filter__link--number" >
      Seção
      </a>
      </div>
      <div class="header__item">
      <a id="qtdetMinProdEstoq" class="filter__link filter__link--number">
      Quantidade Mínima de Produtos</a>
      </div>
      <div class="header__item">
      <a id="qtdeMaxProdEstoq" class="filter__link filter__link--number">
      Quantidade Máxima de Produtos</a>
      </div>
      <div class="header__item">
      <a id="qtdeAtualProdEstoq" class="filter__link filter__link--number">
      Quantidade Atual de Produtos</a>
      </div>


    </div>
    <div class="table-content">
      {
        tableData.map((obj) => {
          return (
            <div class="table-row">
              <div class="table-data">{obj.idEstoq}</div>
              <div class="table-data">{obj.secaoEstoq}</div>
              <div class="table-data">{obj.qtdeMinProdEstoq}</div>
              <div class="table-data">{obj.qtdeMaxProdEstoq}</div>
              <div class="table-data">{obj.qtdeAtualProdEstoq}</div>
            </div>
          );
        })
      }
    </div>
  </div>
    </div>
    </div>
    <div className="mform">
         <div className = "text">Prateleiras</div>
  <button className= "update-btn" onClick={handleCreatePrats}>Criar</button>
  <button className= "delete-btn" onClick={handleClearPrats}>Deletar</button>
  <button className= "update-btn" onClick={handleReporPrateleira}>Repor</button>
      <div className="mtable">
  <div class="table">
  <div class="table-header">
      
  <div class="header__item">
    <a id="idPrat" class="filter__link">
      ID</a>
    </div>
    <div class="header__item">
      <a id="secaoPrat" class="filter__link filter__link--number" >
      Seção
      </a>
      </div>
      <div class="header__item">
      <a id="qtdetMinProdPrat" class="filter__link filter__link--number">
      Quantidade Mínima de Produtos</a>
      </div>
      <div class="header__item">
      <a id="qtdeMaxProdPrat" class="filter__link filter__link--number">
      Quantidade Máxima de Produtos</a>
      </div>
      <div class="header__item">
      <a id="qtdeAtualProdPrat" class="filter__link filter__link--number">
      Quantidade Atual de Produtos</a>
      </div>


    </div>
    <div class="table-content">
      {
        tableData.map((obj) => {
          return (
            <div class="table-row">
              <div class="table-data">{obj.idPrat}</div>
              <div class="table-data">{obj.secaoPrat}</div>
              <div class="table-data">{obj.qtdeMinProdPrat}</div>
              <div class="table-data">{obj.qtdeMaxProdPrat}</div>
              <div class="table-data">{obj.qtdeAtualProdPrat}</div>
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

export default EstoqueePrateleiras;