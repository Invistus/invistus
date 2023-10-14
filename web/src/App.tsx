import React, { useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from 'language/LanguageContext';
import MainLayout from 'layout/MainLayout';
import HomePage from 'features/Home/HomePage';
import { CompoundInterestPage } from 'features/CompoundInterest';
import { FixedIncomeBenchmarkPage } from 'features/FixedIncomeBenchmark';
import { FixedIncomeTutorial } from 'features/Tutorials/FixedIncomeTutorial';
import { RealEstateBenchmarkPage } from 'features/RealEstateBenchmark';
import TutorialPage from 'features/Tutorials/TutorialPage';
import './App.css';

function App() {


    // Function to change the CSS variable value
    const changeAnimationTime = () => {
      document.documentElement.style.setProperty('--inv-animation-time', '0.3s'); // Change the value
    }; 
    useEffect(() => {
      // Call the changeAnimationTime method after a delay of 300 milliseconds when the component mounts
      const timerId = setTimeout(changeAnimationTime, 300);
      console.log('Enable animations')
      // Clean up the timer when the component unmounts
      return () => clearTimeout(timerId);
    }, []);
  

  return (
    <div className="App">
      <LanguageProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/calculators/compound_interest" element={<CompoundInterestPage />} />
              <Route path="/calculators/fixed_income_benchmark" element={<FixedIncomeBenchmarkPage />} />
              <Route path="/calculators/real_state_benchmark" element={<RealEstateBenchmarkPage />} />
              <Route path="/tutorials/fixed_income" element={<TutorialPage tutorial={<FixedIncomeTutorial />} />} />
            </Routes>
          </MainLayout>
        </Router>
      </LanguageProvider>
    </div>
  );
}

export default App;
