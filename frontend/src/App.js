import './App.css';
import Formulario from './pages/Login.js';
import EntrarCaixa from './pages/EntrarCaixa';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    
      <Router> 
        <Routes>
          <Route path="/" element={<Formulario />}/>
         <Route path="EntrarCaixa" element={<EntrarCaixa />}/>
        </Routes>        
      </Router>

  );
}

export default App;