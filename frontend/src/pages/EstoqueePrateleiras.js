import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/style/style.css'
import StoreContext from '../components/Store/Context';
import axios from 'axios';
import Popup from '../components/Popup';


import logo from "../img/logo.png"
import logoSimples from "../img/logoSimples.png"

function createTableEst(data) {
  const estoque = [];
  
  for (let i = 0; i < Object.keys(data.secao).length; i++) {
    estoque.push({
      secaoEstoq: data['secao'][i],
      prod: data['prodnome'][i],
      qtdeAtualProdEstoq: data['quantatualprod'][i]
    });
  }

  return estoque;
}

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
  const [buttonPopup, setButtonPopup] = useState(false);


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

  

  const[formData, setEstoque] = useState({
    id: 0,
    quantidade: 0
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEstoque((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitModal = (event) => {
    event.preventDefault();
    console.log(formData.id);
    console.log(formData.status);

    axios.post('http://127.0.0.1:5000/api/atualizaEncomenda', formData)
      .then(response => {
        console.log('Resposta do servidor:', response.data);
        setButtonPopup(false);
        //handleClearEnc()
        handleCreateEstoque(event)
      })
      .catch(error => {
        console.error('Erro ao enviar dados:', error);
      });
  }

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

const handleCreateEstoque = (event) => {
  event.preventDefault();
      
  axios.get('http://127.0.0.1:5000/api/getEstoque')
    .then(response => {
      console.log('Resposta do servidor:', response.data);
      const table = createTableEst(response.data)
      setTableData([...tableData, ...table])
    })
    .catch(error => {
      console.error('Erro ao enviar dados:', error);
    });
}

const handleReporEstoque = () => {
  setButtonPopup(true);
}

const handleClearPrats = () => {
  setTableData([]);
}

const handleCreatePrats = () => {
  const newUsers = createRandomPrateleira()
  setTableData([...tableData, ...newUsers])
}


const handleReporPrateleira = () => {
  console.log("Funcionalidade de Reposição de Prateleira");
}



    return (
      <div className="container">
        <div className="mform">
          <div className = "text">Estoque</div>
          <button className= "update-btn" onClick={handleCreateEstoque}>Atualizar...</button>
          <button className= "delete-btn" onClick={handleClearEstoque}>Deletar</button>
          <button className= "update-btn" onClick={handleReporEstoque}>Repor</button>
          <div className="mtable">
            <div class="table">
              <div class="table-header">
    
                <div class="header__item">
                  <a id="secaoEstoq" class="filter__link filter__link--number" >
                  Seção
                  </a>
                </div>
                  
                <div class="header__item">
                  <a id="prod" class="filter__link filter__link--number">
                  Produto
                  </a>
                </div>
                  
                <div class="header__item">
                  <a id="qtdeAtualProdEstoq" class="filter__link filter__link--number">
                  Quantidade de Produtos
                  </a>
                </div>
              </div>

              <div class="table-content">
              {
                tableData.map((obj) => {
                  return (
                    <div class="table-row">
                      <div class="table-data">{obj.secaoEstoq}</div>
                      <div class="table-data">{obj.prod}</div>
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

        <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <div className='container-modal'>
            <div className="text-modal">Repor Estoque</div>
            <form onSubmit={handleSubmitModal}>
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
              <div class = "input-modal">
                <label className='modalLabel' for="quantidade">
                  Status
                </label>
                <input 
                  name="quantidade" 
                  className='dadosEncomenda' 
                  value={formData.quantidade}
                  onChange={handleInputChange} required />
    
                   
              </div>
              <button className= "modalButton" 
                      type = "submit" >
                Atualizar
              </button>
            </form> 
          </div>
        </Popup>
      </div>
  );
}

export default EstoqueePrateleiras;