import React, { useState, useCallback } from 'react';
import { CalculatorState } from '../types';
import { performBasicOperation, performScientificOperation, formatDisplay } from '../utils/calculatorUtils';

const ScientificCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
    memory: 0
  });

  const [isRadians, setIsRadians] = useState(false);

  const inputNumber = useCallback((num: string) => {
    setState(prev => ({
      ...prev,
      display: prev.waitingForNewValue ? num : prev.display === '0' ? num : prev.display + num,
      waitingForNewValue: false
    }));
  }, []);

  const inputOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(state.display);

    if (state.previousValue === null) {
      setState(prev => ({
        ...prev,
        previousValue: inputValue,
        operation: nextOperation,
        waitingForNewValue: true
      }));
    } else if (state.operation) {
      const currentValue = state.previousValue || 0;
      try {
        const result = performBasicOperation(currentValue, inputValue, state.operation);
        setState(prev => ({
          ...prev,
          display: formatDisplay(result.toString()),
          previousValue: result,
          operation: nextOperation,
          waitingForNewValue: true
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          display: 'Error',
          previousValue: null,
          operation: null,
          waitingForNewValue: true
        }));
      }
    }
  }, [state]);

  const performScientificCalc = useCallback((operation: string) => {
    const inputValue = parseFloat(state.display);
    
    try {
      let result: number;
      
      if (['sin', 'cos', 'tan'].includes(operation) && !isRadians) {
        result = performScientificOperation(inputValue, operation);
      } else if (['sin', 'cos', 'tan'].includes(operation) && isRadians) {
        const degreeValue = inputValue * 180 / Math.PI;
        result = performScientificOperation(degreeValue, operation);
      } else {
        result = performScientificOperation(inputValue, operation);
      }
      
      setState(prev => ({
        ...prev,
        display: formatDisplay(result.toString()),
        waitingForNewValue: true
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        display: 'Error',
        waitingForNewValue: true
      }));
    }
  }, [state, isRadians]);

  const calculate = useCallback(() => {
    const inputValue = parseFloat(state.display);
    
    if (state.previousValue !== null && state.operation) {
      try {
        const result = performBasicOperation(state.previousValue, inputValue, state.operation);
        setState(prev => ({
          ...prev,
          display: formatDisplay(result.toString()),
          previousValue: null,
          operation: null,
          waitingForNewValue: true
        }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          display: 'Error',
          previousValue: null,
          operation: null,
          waitingForNewValue: true
        }));
      }
    }
  }, [state]);

  const clear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
      memory: 0
    });
  }, []);

  const backspace = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: prev.display.length > 1 ? prev.display.slice(0, -1) : '0'
    }));
  }, []);

  const inputDecimal = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: prev.waitingForNewValue ? '0.' : prev.display.includes('.') ? prev.display : prev.display + '.',
      waitingForNewValue: false
    }));
  }, []);

  const inputConstant = useCallback((constant: string) => {
    let value: number;
    switch (constant) {
      case 'π':
        value = Math.PI;
        break;
      case 'e':
        value = Math.E;
        break;
      default:
        return;
    }
    setState(prev => ({
      ...prev,
      display: formatDisplay(value.toString()),
      waitingForNewValue: true
    }));
  }, []);

  return (
    <div className="calculator scientific">
      <div className="display">
        <span>{state.display}</span>
      </div>
      
      <div className="mode-toggle">
        <button
          onClick={() => setIsRadians(!isRadians)}
          className={`mode-btn ${isRadians ? 'active' : ''}`}
        >
          {isRadians ? 'RAD' : 'DEG'}
        </button>
      </div>
      
      <div className="scientific-functions">
        <button onClick={() => performScientificCalc('sin')} className="btn btn-function">sin</button>
        <button onClick={() => performScientificCalc('cos')} className="btn btn-function">cos</button>
        <button onClick={() => performScientificCalc('tan')} className="btn btn-function">tan</button>
        <button onClick={() => performScientificCalc('log')} className="btn btn-function">log</button>
        <button onClick={() => performScientificCalc('ln')} className="btn btn-function">ln</button>
        <button onClick={() => performScientificCalc('x²')} className="btn btn-function">x²</button>
        
        <button onClick={() => performScientificCalc('x³')} className="btn btn-function">x³</button>
        <button onClick={() => performScientificCalc('sqrt')} className="btn btn-function">√</button>
        <button onClick={() => performScientificCalc('1/x')} className="btn btn-function">1/x</button>
        <button onClick={() => performScientificCalc('x!')} className="btn btn-function">x!</button>
        <button onClick={() => inputConstant('π')} className="btn btn-constant">π</button>
        <button onClick={() => inputConstant('e')} className="btn btn-constant">e</button>
      </div>
      
      <div className="button-grid">
        <button onClick={clear} className="btn btn-clear">C</button>
        <button onClick={backspace} className="btn btn-secondary">⌫</button>
        <button onClick={() => inputOperation('÷')} className="btn btn-operator">÷</button>
        <button onClick={() => inputOperation('×')} className="btn btn-operator">×</button>
        <button onClick={() => inputNumber('7')} className="btn btn-number">7</button>
        
        <button onClick={() => inputNumber('8')} className="btn btn-number">8</button>
        <button onClick={() => inputNumber('9')} className="btn btn-number">9</button>
        <button onClick={() => inputOperation('-')} className="btn btn-operator">-</button>
        <button onClick={() => inputNumber('4')} className="btn btn-number">4</button>
        
        <button onClick={() => inputNumber('5')} className="btn btn-number">5</button>
        <button onClick={() => inputNumber('6')} className="btn btn-number">6</button>
        <button onClick={() => inputOperation('+')} className="btn btn-operator">+</button>
        <button onClick={() => inputNumber('1')} className="btn btn-number">1</button>
        
        <button onClick={() => inputNumber('2')} className="btn btn-number">2</button>
        <button onClick={() => inputNumber('3')} className="btn btn-number">3</button>
        <button onClick={() => inputNumber('0')} className="btn btn-number btn-zero">0</button>
        
        <button onClick={inputDecimal} className="btn btn-number">.</button>
        <button onClick={calculate} className="btn btn-equals">=</button>
      </div>
    </div>
  );
};

export default ScientificCalculator;