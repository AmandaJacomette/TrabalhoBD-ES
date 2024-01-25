import React, { useContext, useState, Component, useEffect } from 'react';
import StoreContext from '../components/Store/Context';
import Sidebar from '../components/Sidebar'
import '../components/sidebar.css'
import { Link, useNavigate } from 'react-router-dom';
import JornadadeTrabalho from './JornadadeTrabalho';
import RecursosHumanos from './RecursosHumanos';
import VendasRealizadas from './VendasRealizadas';
import Encomendas from './Encomendas';
import Relatorios from './Relatorios';
import Departamento from './Departamento';

const Home = ({userData}) => {
  const { setToken, token } = useContext(StoreContext);
  const navigate = useNavigate();

  const [state, setState] = useState(0)

  const handleClick = (event, value) => {
    console.log(event.target);
    console.log(value);
    setState({
      message: value
    });
  }

  useEffect(() => {
    console.log(state);
    console.log(token);
  })

  return (
    <div className="main">
      { token ?
        <div>
        <Sidebar userData={userData} newMessage={ handleClick } token={token}></Sidebar>
        {state.message == 0 ?
          <h2>Pagina Inicial</h2>
        : ''}
        {state.message == 1 ?
          <JornadadeTrabalho userData={userData}></JornadadeTrabalho>
          
        : ''}
        {state.message == 2 ?
          <RecursosHumanos userData={userData}></RecursosHumanos>
          
        : ''}
         {state.message == 3 ?
          <VendasRealizadas userData={userData}></VendasRealizadas>
          
        : ''}
         {state.message == 4 ?
          <Encomendas userData={userData}></Encomendas>
          
        : ''}
         {state.message == 5 ?
          <Relatorios userData={userData}></Relatorios>
          
        : ''}
         {state.message == 6 ?
          <Departamento userData={userData}></Departamento>
          
        : ''}
         {state.message == 7 ?
          <div></div>
          
        : ''}
        <br/>
      </div>
      
      : navigate("/")}
      
    </div>
  );
};

export default Home;