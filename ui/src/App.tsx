import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import CompoundInterestPage from './pages/calculators/CompoundInterestPage';
import './App.css';

const reload = () => window.location.reload();

function App() {
  return (
    <div className="App">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/calculadora/juros_compostos" element={<CompoundInterestPage />} />
            <Route path="/calculadora/sac_vs_price" element={<CompoundInterestPage />} />
            <Route path="/calculadora/cdb_vs_lc" element={<CompoundInterestPage />} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
