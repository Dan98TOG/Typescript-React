import React, { useState } from 'react';
import { CalculatorType } from '../types';
import BasicCalculator from './BasicCalculator';
import ScientificCalculator from './ScientificCalculator';

const Calculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>('basic');

  return (
    <div className="app">
      <div className="header">
        <h1>Calculator</h1>
        <p>BY DAN VINCENT ADLAWAN</p>
      </div>
      
      <div className="calculator-selector">
        <div className="selector-container">
          <button
            onClick={() => setCalculatorType('basic')}
            className={`selector-btn ${calculatorType === 'basic' ? 'active' : ''}`}
          >
            📱 Basic Calculator
          </button>
          <button
            onClick={() => setCalculatorType('scientific')}
            className={`selector-btn ${calculatorType === 'scientific' ? 'active' : ''}`}
          >
            🧪 Scientific Calculator
          </button>
        </div>
      </div>
      
      <div className="calculator-container">
        {calculatorType === 'basic' ? (
          <BasicCalculator />
        ) : (
          <ScientificCalculator />
        )}
      </div>
    </div>
  );
};

export default Calculator;