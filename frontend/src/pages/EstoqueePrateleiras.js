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

function EstoqueePrateleiras({userData}){
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const { setToken, token } = useContext(StoreContext);
  
  const[formData, setProdutos] = useState({
    idProd: '3009',
    nomeProd: 'Produto 0',
    valorProd: 15.50,
    fornecedorCNPJ: '19.999.999/0001-10',
    codBarra: '5901234123467'
  });
  
  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setProdutos((prevData) => ({
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

  const handleClearProducts = () => {
    setTableData([]);
  }

const handleCreateProducts = () => {
    const newUsers = createRandomProdutos()
    setTableData([...tableData, ...newUsers])
}


    return (
      <div className="mform">
         <div className = "text">Estoque</div>
  <button className= "update-btn" onClick={handleCreateProducts}>Criar</button>
  <button className= "delete-btn" onClick={handleClearProducts}>Deletar</button>
      <div className="mtable">
  <div class="table">
  <div class="table-header">
      
  <div class="header__item">
    <a id="idProd" class="filter__link">
      ID</a>
    </div>
    <div class="header__item">
      <a id="nomeProd" class="filter__link filter__link--number" >
       Nome
      </a>
      </div>
      <div class="header__item">
      <a id="valorProd" class="filter__link filter__link--number">
        Valor</a>
      </div>
      <div class="header__item">
      <a id="fornecedorCNPJ" class="filter__link filter__link--number">
        Fornecedor </a>
      </div>
      <div class="header__item">
      <a id="codBarra" class="filter__link filter__link--number">
        Código de Barra</a>
      </div>


    </div>
    <div class="table-content">
      {
        tableData.map((obj) => {
          return (
            <div class="table-row">
              <div class="table-data">{obj.idProd}</div>
              <div class="table-data">{obj.nomeProd}</div>
              <div class="table-data">{obj.valorProd}</div>
              <div class="table-data">{obj.fornecedorCNPJ}</div>
              <div class="table-data">{obj.codBarra}</div>
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

export default EstoqueePrateleiras;