import './App.css';
import Formulario from './pages/Login.js';
import EntrarCaixa from './pages/EntrarCaixa';
import Encomendas from './pages/Encomendas';
import RecursosHumanos from './pages/RecursosHumanos';
import VendasRealizadas from './pages/VendasRealizadas';
import PrateleiraseEstoque from './pages/EstoqueePrateleiras'
import Relatorios from './pages/Relatorios'
import Departamento from './pages/Departamento'
import JornadadeTrabalho from './pages/JornadadeTrabalho'
import Home from './pages/Home.js'
import StoreProvider from './components/Store/Provider';
import StoreContext from './components/Store/Context';

import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import React, { useContext } from 'react';

/*
        <Route path="/" element={<Formulario />}/>
         <Route path="EntrarCaixa" element={<EntrarCaixa />}/>
*/
function App() {
  const { token } = useContext(StoreContext);

  return (
    <StoreProvider>
      <Router> 
        <Routes>
        <Route path="/login" element={<Formulario />}/>
        <Route path = "/" element= {<Home/>}/>
        <Route path="EntrarCaixa" element={<EntrarCaixa />}/>
        <Route path="JornadadeTrabalho" element={<JornadadeTrabalho/>}/>
         <Route path="RecursosHumanos" element={<RecursosHumanos />}/>
         <Route path="VendasRealizadas" element={<VendasRealizadas/>}/>
         <Route path="PrateleiraseEstoque" element={<PrateleiraseEstoque/>}/>
         <Route path="Encomendas" element={<Encomendas/>}/>
         <Route path="Relatorios" element={<Relatorios/>}/>
         <Route path="Departamento" element={<Departamento/>}/>
        </Routes>  
      </Router>
 </StoreProvider>
  );
}

export default App;