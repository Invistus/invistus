import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from 'language/LanguageContext';
import MainLayout from 'layout/MainLayout';
import './App.css';
import HomePage from 'features/Home/HomePage';
import { CompoundInterestPage } from 'features/CompoundInterest';
import { FixedIncomeBenchmarckPage } from 'features/FixedIncomeBenchmarck';

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
              <Route path="/calculators/fixed_income_benchmark" element={<FixedIncomeBenchmarckPage />} />
              <Route path="/calculators/rent_or_buy" element={<CompoundInterestPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
