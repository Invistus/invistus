import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from 'language/LanguageContext';
import MainLayout from 'layout/MainLayout';
import HomePage from 'pages/home/HomePage';
import CompoundInterestPage from 'pages/calculators/CompoundInterestPage';
import FixedIncomeComparisonPage from 'pages/calculators/FixedIncomeComparisonPage';
import './App.css';

// const reload = () => window.location.reload();

function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculators/compound_interest" element={<CompoundInterestPage />} />
              <Route path="/calculators/sac_vs_price" element={<CompoundInterestPage />} />
              <Route path="/calculators/cdb_vs_lci_lca" element={<FixedIncomeComparisonPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
